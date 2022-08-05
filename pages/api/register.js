import axios from "axios";
import nookies from "nookies";

export default async function register(req, res) {
  if (req.method !== "POST") return res.status(404).send();

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

  try {
    const resp = await axios.post(
      process.env.DASHBOARD_URL + "/user/register",
      { name, category, branch, email, password },
      {
        headers: {
          "x-api-key": process.env.DASHBOARD_API_KEY,
          "user-agent": req.headers["user-agent"],
        },
      }
    );

    if (!resp.data.token) throw resp;
    const token = String(resp.data.token);
    nookies.set({ req, res }, "_amclf", token, {
      maxAge: 60 * 60 * 24 * 3,
      path: "/",
      httpOnly: true,
    });

    res.status(200).send("Berhasil terdaftar");
  } catch (err) {
    return res.status(500).send(err.response?.data || err);
  }
}
