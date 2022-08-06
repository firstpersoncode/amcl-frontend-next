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
