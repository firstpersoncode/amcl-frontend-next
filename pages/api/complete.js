import axios from "axios";
import getToken from "utils/getToken";

export default async function complete(req, res) {
  if (req.method !== "GET") return res.status(404).send();
  const token = getToken({ req, res });

  try {
    await axios.get(process.env.DASHBOARD_URL + "/user/complete", {
      headers: { "x-api-key": process.env.DASHBOARD_API_KEY, "x-token": token },
    });

    res.status(201).send();
  } catch (err) {
    return res.status(500).send(err.response?.data || err);
  }
}
