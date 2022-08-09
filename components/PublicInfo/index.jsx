import { useState } from "react";
import { QrCode } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  Fab,
  Typography,
  Box,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

export default function PublicInfo({ participant }) {
  const fileAvatar =
    participant.files?.length &&
    participant.files.find((file) => file.type === "avatar");

  const [openQRCode, setOpenQRCode] = useState(false);
  const toggleQRCode = () => {
    setOpenQRCode(!openQRCode);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(/banner.PNG)",
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "content-box",
          backgroundSize: "cover",
          filter: "blur(3px)",
          opacity: "0.5",
        }}
      />
      <Dialog open fullWidth maxWidth="sm">
        <Card sx={{ minHeight: "400px", position: "relative" }} elevation={4}>
          <CardMedia
            component="img"
            height="200"
            image="/bannerr.PNG"
            alt="Banner"
          />
          <Box
            sx={{
              position: "absolute",
              top: "100px",
              left: 0,
              width: "100%",
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Avatar
              alt={fileAvatar.url}
              src={fileAvatar.url}
              sx={{ height: "150px", width: "150px" }}
            />
          </Box>
          <Box
            sx={{
              p: 2,
              paddingTop: "100px",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">{participant.name}</Typography>
            <Typography>{participant.email}</Typography>
            <Fab
              disabled={!participant.qrcode?.idString}
              onClick={toggleQRCode}
              size="large"
              sx={{ my: 2 }}
              color="secondary"
              variant="contained"
            >
              <QrCode />
            </Fab>

            {/* <Typography
              sx={{
                mt: 8,
                fontSize: "10px",
                textAlign: "right",
                opacity: "0.5",
              }}
            >
              AMCL Frontend v 0.0.1
              <Divider sx={{ my: 1 }} />
              By{" "}
              <a
                href="https://github.com/firstpersoncode"
                target="_blank"
                rel="noreferrer"
              >
                @firstpersoncode
              </a>
            </Typography> */}
          </Box>
        </Card>
      </Dialog>

      <Dialog open={openQRCode} onClose={toggleQRCode}>
        <DialogContent sx={{ backgroundColor: "#FFF", textAlign: "center" }}>
          <QRCodeSVG
            height={250}
            width={250}
            value={participant.qrcode?.idString}
          />
          <Typography sx={{ mt: 2, fontSize: "12px" }}>
            {participant.qrcode?.idString}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
