import axios from "axios";
import getToken from "utils/getToken";

export default async function archive(req, res) {
  if (req.method !== "POST") return res.status(404).send();
  const token = getToken({ req, res });

  const { idString } = req.body;
  try {
    await axios.post(
      process.env.DASHBOARD_URL + "/user/participants/archive",
      { idString },
      {
        headers: {
          "x-api-key": process.env.DASHBOARD_API_KEY,
          "x-token": token,
        },
      }
    );

    res.status(200).send();
  } catch (err) {
    return res.status(500).send(err.response?.data || err.toString());
  }
}
