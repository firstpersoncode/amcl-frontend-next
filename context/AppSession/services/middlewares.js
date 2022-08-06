import getUser from "./getUser";

export function withSession(handler) {
  return async (ctx) => {
    ctx.req.user = await getUser(ctx);
    const returnHandler = await handler(ctx);

    return {
      ...returnHandler,
      props: {
        ...returnHandler.props,
        ...(ctx.req.user ? { user: ctx.req.user } : {}),
      },
    };
  };
}
