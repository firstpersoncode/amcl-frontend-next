import axios from "axios";
import getToken from "utils/getToken";

export default async function logout(req, res) {
  if (req.method !== "GET") return res.status(404).send();
  const token = getToken({ req, res });

  await axios.get(process.env.DASHBOARD_URL + "/user/logout", {
    headers: { "x-api-key": process.env.DASHBOARD_API_KEY, "x-token": token },
  });

  res.status(201).send();
}
