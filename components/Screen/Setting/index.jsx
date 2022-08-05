import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Button, Dialog, DialogContent, Fab } from "@mui/material";
import { Logout, Help, QrCode } from "@mui/icons-material";
import Loader from "./Loader";

export default function Setting() {
  const [isLoading, setIsLoading] = useState(false);

  const [openDialogMessage, setOpenDialogMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const toggleDialogMessage = () => {
    setOpenDialogMessage(!openDialogMessage);
  };

  const { replace } = useRouter();
  const onLogout = async () => {
    setIsLoading(true);
    await axios.get("/api/logout");
    setIsLoading(false);
    replace("/login");
  };

  const onGenerateQR = async () => {
    setIsLoading(true);
    try {
      await axios.get("/api/complete");
      setMessage("QR Code berhasil dibuat");
      toggleDialogMessage();
    } catch (err) {
      if (err.response?.data) {
        setMessage(err.response.data);
        toggleDialogMessage();
      }
    }
    setIsLoading(false);
  };

  return (
    <Box>
      {isLoading && <Loader />}

      <Button
        onClick={onGenerateQR}
        fullWidth
        size="large"
        variant="contained"
        sx={{ textTransform: "unset", mb: 2 }}
        color="success"
      >
        <QrCode sx={{ mr: 1 }} />
        Generate QR Code
      </Button>

      <Button
        fullWidth
        size="large"
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
          color="error"
        >
          <Logout sx={{ mr: 1 }} />
          Keluar
        </Fab>
      </Box>

      <Dialog open={openDialogMessage} onClose={toggleDialogMessage}>
        <DialogContent>{message}</DialogContent>
      </Dialog>
    </Box>
  );
}
