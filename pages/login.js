import { CommonContextProvider } from "context/Common";
import { AppSessionContextProvider, withSession } from "context/AppSession";
import ModalLogin from "components/ModalLogin";

export default function Login({ user, global }) {
  return (
    <AppSessionContextProvider context={user}>
      <CommonContextProvider context={global}>
        <ModalLogin />
      </CommonContextProvider>
    </AppSessionContextProvider>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(ctx) {
    const isLoggedIn = ctx.req.session.getEvent("user");

    if (isLoggedIn) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
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
