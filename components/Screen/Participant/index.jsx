import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@mui/material";
import { useAppSessionContext } from "context/AppSession";
import ListParticipant from "./ListParticipant";
import ListLoader from "./ListLoader";
import { useRouter } from "next/router";

export default function Participant() {
  const user = useAppSessionContext();

  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [officials, setOfficials] = useState([]);

  const fetchRows = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/common/participant/read", {
        take: 17,
        skip: 0,
        filter: { schoolId: user.id },
      });
      if (res?.data?.length) {
        setParticipants(
          res.data
            .filter((p) => p.type === "participant")
            .map((p) => ({
              ...p,
              avatar: p.files.find((f) => f.type === "avatar"),
            }))
        );

        setOfficials(
          res.data
            .filter((p) => p.type === "official")
            .map((p) => ({
              ...p,
              avatar: p.files.find((f) => f.type === "avatar"),
            }))
        );
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }, [user.id]);

  useEffect(() => {
    if (!participants.length || !officials.length) fetchRows();
  }, [fetchRows]);

  if (isLoading) return <ListLoader />;
  return (
    <>
      <ListParticipant
        type="participant"
        fetchRows={fetchRows}
        participants={participants}
      />

      <ListParticipant
        type="official"
        fetchRows={fetchRows}
        participants={officials}
      />
    </>
  );
}
