import axios from "axios";
import { compareSync } from "bcryptjs";
import { withSession } from "context/AppSession";
import { getSchoolByEmail } from "prisma/services/school";

export default withSession(
  async function login(req, res) {
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

    const { email, password } = req.body;
    if (!(email && password)) return res.status(403).send();

    const user = await getSchoolByEmail(email);
    if (!user) return res.status(401).send("Akun tidak ditemukan");

    const eligible = compareSync(password, user.password);
    if (!eligible) return res.status(401).send("Password salah");

    await req.session.setEvent("user", {
      event: {
        id: user.id,
        idString: user.idString,

        email: user.email,
        name: user.name,
        category: user.category,
        branch: user.branch,

        active: user.active,
        completed: user.completed,
      },
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    res.status(200).send();
  },
  { methods: ["POST"], roles: ["user"], errorOnLoggedIn: true }
);
