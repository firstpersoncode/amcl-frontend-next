import axios from "axios";
import getToken from "utils/getToken";

export default async function getUser(ctx) {
  const token = getToken(ctx);
  const res = await axios.get(process.env.DASHBOARD_URL + "/user/me", {
    headers: {
      "x-api-key": process.env.DASHBOARD_API_KEY,
      "x-token": token,
    },
  });
  const user = res?.data.user;

  return user;
}
