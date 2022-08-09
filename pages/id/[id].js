import PublicInfo from "components/PublicInfo";
import axios from "axios";
import { getParticipantIDCard } from "prisma/services/participant";

export default function ID({ participant }) {
  return <PublicInfo participant={participant} />;
}

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  let participant;
  try {
    participant = await getParticipantIDCard(params.id);
  } catch (err) {}

  if (!participant) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      participant,
    },
  };
}
