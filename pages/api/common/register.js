import { hashSync } from "bcryptjs";
import { createSchool, getSchoolByEmail } from "prisma/services/school";
import generateUID from "utils/generateUID";

import { withSession } from "context/AppSession";
import axios from "axios";

export default withSession(
  async function register(req, res) {
    if (
      process.env.BUILD_ENV === "production" ||
      process.env.BUILD_ENV === "prod"
    ) {
      const { captcha } = req.body;

      const validateCaptcha = await axios.post(
        "https://hcaptcha.com/siteverify",
        `response=${captcha}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
        }
      );

      const isValid = validateCaptcha.data?.success;

      if (!isValid) return res.status(403).send("Invalid captcha");
    }

    const { name, category, branch, email, password } = req.body;
    if (!(name && category && branch && email && password))
      return res.status(403).send();

    const exists = await getSchoolByEmail(email);
    if (exists)
      return res
        .status(401)
        .send(`Akun dengan email ${email} telah terdaftar, lakukan login.`);

    const hashedPassword = hashSync(password, 8);
    const newUser = await createSchool({
      name,
      category,
      branch,
      email,
      password: hashedPassword,
      idString: generateUID(),
      active: false,
      archived: false,
      completed: false,
    });

    await req.session.setEvent("user", {
      event: {
        id: newUser.id,
        idString: newUser.idString,

        email: newUser.email,
        name: newUser.name,
        category: newUser.category,
        branch: newUser.branch,

        active: newUser.active,
        completed: newUser.completed,
      },
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    res.status(201).send();
  },
  { methods: ["POST"], roles: ["user"], errorOnLoggedIn: true }
);
