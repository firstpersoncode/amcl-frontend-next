import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@mui/material";
import { useAppSessionContext } from "context/AppSession";
import ListParticipant from "./ListParticipant";
import ListLoader from "./ListLoader";
import { useRouter } from "next/router";

export default function Participant() {
  const user = useAppSessionContext();
  const [openDialogMessage, setOpenDialogMessage] = useState(false);
  const toggleDialogMessage = useCallback(() => {
    setOpenDialogMessage((v) => !v);
  }, []);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user.active) {
      setMessage(
        "Saat ini Anda belum dapat mendaftarkan peserta Anda. Team kami sedang melakukan konfirmasi akun. Silahkan tunggu beberapa saat lagi"
      );

      setOpenDialogMessage(true);
    }
  }, [user.active]);

  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [officials, setOfficials] = useState([]);

  const fetchRows = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/participants");
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
  }, []);

  useEffect(() => {
    if (!participants.length) fetchRows();
  }, [participants, fetchRows]);

  const { asPath } = useRouter();

  if (isLoading || asPath !== "/participant") return <ListLoader />;
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

      <Dialog open={openDialogMessage} onClose={toggleDialogMessage}>
        <DialogContent>{message}</DialogContent>
      </Dialog>
    </>
  );
}
