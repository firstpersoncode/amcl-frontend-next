import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppSessionContext } from "context/AppSession";
import ListParticipant from "./ListParticipant";
import ListLoader from "./ListLoader";

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

  return (
    <Box>
      <ListParticipant
        type="participant"
        fetchRows={fetchRows}
        participants={participants}
      />
      {isLoading && <ListLoader />}
      <Button
        disabled={!user.active || user.completed || participants.length >= 14}
        fullWidth
        size="large"
        variant="contained"
        sx={{ textTransform: "unset" }}
      >
        <Add sx={{ mr: 1 }} />
        Tambah Peserta
      </Button>
      <ListParticipant
        type="official"
        fetchRows={fetchRows}
        participants={officials}
      />
      {isLoading && <ListLoader />}
      <Button
        disabled={
          !user.active || user.completed || user.category === "univ"
            ? officials.length >= 2
            : officials.length >= 3
        }
        fullWidth
        size="large"
        variant="contained"
        sx={{ textTransform: "unset" }}
      >
        <Add sx={{ mr: 1 }} />
        Tambah Official
      </Button>

      <Dialog open={openDialogMessage} onClose={toggleDialogMessage}>
        <DialogContent>{message}</DialogContent>
      </Dialog>
    </Box>
  );
}