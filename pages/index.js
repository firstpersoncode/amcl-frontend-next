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

export const getServerSideProps = withSession(async function getServerSideProps(
  ctx
) {
  if (!ctx.req.user) {
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
});
