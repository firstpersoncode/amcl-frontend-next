import { CommonContextProvider } from "context/Common";
import {
  AppSessionContextProvider,
  withSessionLogin,
} from "context/AppSession";
import ModalRegister from "components/ModalRegister";

export default function Register({ session, global }) {
  return (
    <AppSessionContextProvider session={session}>
      <CommonContextProvider context={global}>
        <ModalRegister />
      </CommonContextProvider>
    </AppSessionContextProvider>
  );
}

export const getServerSideProps = withSessionLogin(
  async function getServerSideProps(ctx) {
    return {
      props: {
        global: { page: {}, ua: ctx.req.headers["user-agent"] },
      },
    };
  }
);
