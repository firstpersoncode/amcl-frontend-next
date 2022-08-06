import axios from "axios";
import getToken from "utils/getToken";

export default async function update(req, res) {
  if (req.method !== "POST") return res.status(404).send();
  const token = getToken({ req, res });

  const { idString, participant } = req.body;
  try {
    const resp = await axios.post(
      process.env.DASHBOARD_URL + "/user/participants/update",
      { idString, participant },
      {
        headers: {
          "x-api-key": process.env.DASHBOARD_API_KEY,
          "x-token": token,
        },
      }
    );

    const p = resp?.data;

    res.status(200).json(p);
  } catch (err) {
    return res.status(500).send(err.response?.data || err.toString());
  }
}
