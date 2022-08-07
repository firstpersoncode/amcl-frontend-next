import { CommonContextProvider } from "context/Common";
import { AppSessionContextProvider, withSessionSsr } from "context/AppSession";
import ModalRegister from "components/ModalRegister";

export default function Register({ user, global }) {
  return (
    <AppSessionContextProvider context={user}>
      <CommonContextProvider context={global}>
        <ModalRegister />
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
