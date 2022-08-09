import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  Typography,
} from "@mui/material";
import { Logout, Help, QrCode } from "@mui/icons-material";
import Loader from "./Loader";
import { useAppSessionContext } from "context/AppSession";
import HelpPanel from "./HelpPanel";

export default function Setting() {
  const [isLoading, setIsLoading] = useState(false);

  const [openDialogMessage, setOpenDialogMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const toggleDialogMessage = () => {
    setOpenDialogMessage(!openDialogMessage);
  };
  const [openQRConfirmation, setOpenQRConfirmation] = useState(false);
  const toggleQRConfirmation = () => {
    setOpenQRConfirmation(!openQRConfirmation);
  };

  const { replace } = useRouter();
  const onLogout = async () => {
    setIsLoading(true);
    await axios.get("/api/logout");
    setIsLoading(false);
    replace("/login");
  };

  const user = useAppSessionContext();
  const [generated, setGenerated] = useState(user.completed);

  const onGenerateQR = async () => {
    setIsLoading(true);
    try {
      await axios.get("/api/complete");
      setMessage("QR Code berhasil dibuat");
      toggleDialogMessage();
      setGenerated(true);
    } catch (err) {
      if (err.response?.data) {
        setMessage(err.response.data);
        toggleDialogMessage();
      }
    }
    setIsLoading(false);
    toggleQRConfirmation();
  };

  const [openHelp, setOpenHelp] = useState(false);
  const toggleHelp = () => {
    setOpenHelp(!openHelp);
  };

  return (
    <>
      {isLoading && <Loader />}

      <Button
        disabled={generated || !user.active || user.completed}
        onClick={toggleQRConfirmation}
        fullWidth
        size="large"
        color="secondary"
        variant="contained"
        sx={{ textTransform: "unset", mb: 2 }}
      >
        <QrCode sx={{ mr: 1 }} />
        Generate QR Code
      </Button>

      <Button
        onClick={toggleHelp}
        fullWidth
        size="large"
        color="secondary"
        variant="contained"
        sx={{ textTransform: "unset", mb: 2 }}
      >
        <Help sx={{ mr: 1 }} />
        Bantuan
      </Button>

      <Box sx={{ textAlign: "right" }}>
        <Fab
          sx={{ textTransform: "unset" }}
          variant="extended"
          onClick={onLogout}
        >
          <Logout sx={{ mr: 1 }} />
          Keluar
        </Fab>
      </Box>

      <Dialog open={openHelp} onClose={toggleHelp}>
        <DialogContent>
          <HelpPanel />
        </DialogContent>
      </Dialog>

      <Dialog open={openQRConfirmation} onClose={toggleQRConfirmation}>
        {isLoading && <Loader />}
        <DialogContent>
          <Typography>
            Setelah ini, Anda tidak dapat lagi mengisi / mengubah data peserta
            Anda.
          </Typography>
          <Typography sx={{ mt: 2, fontSize: "14px" }}>
            Apakah Anda yakin ingin menyelesaikan pendaftaran?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: "unset" }}
            color="secondary"
            onClick={toggleQRConfirmation}
          >
            Batal
          </Button>
          <Button sx={{ textTransform: "unset" }} onClick={onGenerateQR}>
            Selesai pendaftaran
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogMessage} onClose={toggleDialogMessage}>
        <DialogContent>{message}</DialogContent>
      </Dialog>
    </>
  );
}
