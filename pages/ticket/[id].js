import PublicInfo from "components/PublicInfo";
import axios from "axios";

export default function Ticket({ participant }) {
  return <PublicInfo participant={participant} />;
}

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  let participant = {};
  try {
    const resp = await axios.get(
      process.env.DASHBOARD_URL + "/user/ticket?id=" + params.id,
      {
        headers: {
          "x-api-key": process.env.DASHBOARD_API_KEY,
        },
      }
    );

    if (resp?.data.participant) participant = resp.data.participant;
  } catch (err) {}

  return {
    props: {
      participant,
    },
  };
}
