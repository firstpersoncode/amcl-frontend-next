import { CommonContextProvider } from "context/Common";
import {
  AppSessionContextProvider,
  withSessionLogin,
} from "context/AppSession";
import ModalLogin from "components/ModalLogin";

export default function Login({ session, global }) {
  return (
    <AppSessionContextProvider session={session}>
      <CommonContextProvider context={global}>
        <ModalLogin />
      </CommonContextProvider>
    </AppSessionContextProvider>
  );
}

// export const getServerSideProps = withSessionLogin(
//   async function getServerSideProps(ctx) {
//     return {
//       props: {
//         global: { page: {}, ua: ctx.req.headers["user-agent"] },
//       },
//     };
//   }
// );
