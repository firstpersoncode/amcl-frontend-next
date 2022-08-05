import axios from "axios";
import getToken from "utils/getToken";

export default async function participants(req, res) {
  if (req.method !== "GET") return res.status(404).send();
  const token = getToken({ req, res });

  try {
    const resp = await axios.get(
      process.env.DASHBOARD_URL + "/user/participants",
      {
        headers: {
          "x-api-key": process.env.DASHBOARD_API_KEY,
          "x-token": token,
        },
      }
    );

    const participants = resp?.data.participants;

    res.status(200).json(participants);
  } catch (err) {
    return res.status(500).send(err.response?.data || err);
  }
}
