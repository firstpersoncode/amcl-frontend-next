import { CommonContextProvider } from "context/Common";
import { AppSessionContextProvider, withSession } from "context/AppSession";
import Screen from "components/Screen";

export default function Index({ user, global }) {
  return (
    <AppSessionContextProvider context={user}>
      <CommonContextProvider context={global}>
        <Screen />
      </CommonContextProvider>
    </AppSessionContextProvider>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(ctx) {
    const isLoggedIn = ctx.req.session.getEvent("admin");

    if (!isLoggedIn) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    return {
      props: {
        global: { page: {}, ua: ctx.req.headers["user-agent"] },
      },
    };
  }
);
