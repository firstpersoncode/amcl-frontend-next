import { CommonContextProvider } from "context/Common";
import { AppSessionContextProvider, withSessionAuth } from "context/AppSession";
import Screen from "components/Screen";

export default function Index({ session, global }) {
  return (
    <AppSessionContextProvider session={session}>
      <CommonContextProvider context={global}>
        <Screen />
      </CommonContextProvider>
    </AppSessionContextProvider>
  );
}

export const getServerSideProps = withSessionAuth(
  async function getServerSideProps(ctx) {
    return {
      props: {
        global: { page: {}, ua: ctx.req.headers["user-agent"] },
      },
    };
  }
);
