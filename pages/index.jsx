import { CommonContextProvider } from "context/Common";
import { AppSessionContextProvider, withSessionSsr } from "context/AppSession";
import Screen from "components/Screen";
import { getSchool } from "prisma/services/school";

export default function Index({ user, global }) {
  return (
    <AppSessionContextProvider session={user}>
      <CommonContextProvider context={global}>
        <Screen />
      </CommonContextProvider>
    </AppSessionContextProvider>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(ctx) {
    const user = ctx.req.session.getEvent("user").event;
    const school = await getSchool(user.idString);

    return {
      props: {
        global: { page: {}, ua: ctx.req.headers["user-agent"] },
        user: JSON.parse(JSON.stringify(school || {})),
      },
    };
  },
  { redirect: { permanent: false, destination: "/login" } }
);
