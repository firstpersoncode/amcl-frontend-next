import axios from "axios";
import getToken from "utils/getToken";

export function withSessionAuth(handler) {
  return async (ctx) => {
    try {
      const token = getToken(ctx);
      const res = await axios.get(process.env.DASHBOARD_URL + "/user/me", {
        headers: {
          "x-api-key": process.env.DASHBOARD_API_KEY,
          "x-token": token,
        },
      });
      const user = res?.data.user;
      if (!user) throw new Error("Not logged in");
      ctx.req.user = user;
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    const returnHandler = await handler(ctx);

    return {
      ...returnHandler,
      props: {
        ...returnHandler.props,
        session: ctx.req.user,
      },
    };
  };
}

export function withSessionLogin(handler) {
  return async (ctx) => {
    try {
      const token = getToken(ctx);
      const res = await axios.get(process.env.DASHBOARD_URL + "/user/me", {
        headers: {
          "x-api-key": process.env.DASHBOARD_API_KEY,
          "x-token": token,
        },
      });
      const user = res?.data.user;
      if (user) throw new Error("Logged in");
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    const returnHandler = await handler(ctx);

    return {
      ...returnHandler,
      props: {
        ...returnHandler.props,
      },
    };
  };
}
