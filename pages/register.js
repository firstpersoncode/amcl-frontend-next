import { CommonContextProvider } from "context/Common";
import { AppSessionContextProvider, withSession } from "context/AppSession";
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

export const getServerSideProps = withSession(async function getServerSideProps(
  ctx
) {
  if (ctx.req.user) {
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
});
