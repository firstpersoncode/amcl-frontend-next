import { useState } from "react";
import { QrCode } from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

export default function PublicInfo({ participant }) {
  const fileAvatar =
    participant.files?.length &&
    participant.files.find((file) => file.type === "avatar");

  const [openQRCode, setOpenQRCode] = useState(false);
  const toggleQRCode = () => {
    setOpenQRCode(!openQRCode);
  };

  const bg = {
    hs: "url(/bg-1.jpg)",
    univ: "url(/bg-2.jpg)",
    js: "url(/bg-3.jpg)",
  };

  const backgroundImage = bg[participant.school.category];
  const isJs = participant.school.category === "js";

  const op = {
    coach: "Pelatih",
    coachAssistant: "Asisten Pelatih",
    manager: "Manager",
    teacher: "Guru",
  };

  const isOfficial = participant.type === "official";
  const officialPosition = isOfficial && op[participant.officialPosition];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "content-box",
          backgroundSize: "cover",
          filter: "blur(3px)",
          zIndex: -1,
        }}
      />

      {!isJs && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: -1,
          }}
        />
      )}

      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src={isJs ? "/logo-sm-red.png" : "/logo-sm.png"}
              width="60px"
              height="80px"
              alt="logo"
            />
            <Box sx={{ color: isJs ? "#470000" : "#FFF", pl: 2 }}>
              <Typography sx={{ margin: 0 }}>
                <strong>MAKASSAR</strong>
              </Typography>
              <Typography sx={{ margin: 0 }}>CHAMPIONS</Typography>
              <Typography sx={{ margin: 0 }}>LEAGUE</Typography>
            </Box>
          </Box>
          <Button
            // disabled={!participant.qrcode?.idString}
            onClick={toggleQRCode}
          >
            <QrCode
              sx={{ fontSize: "50px", color: isJs ? "#470000" : "#FFF" }}
            />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
          }}
        >
          <Avatar
            alt={fileAvatar.url}
            src={fileAvatar.url}
            sx={{
              height: "230px",
              width: "230px",
              border: `5px solid ${isJs ? "#470000" : "#FFF"}`,
            }}
          />
        </Box>
        <Box sx={{ textAlign: "center", my: 2 }}>
          <Typography
            sx={{
              fontStyle: "italic",
              color: isJs ? "#470000" : "#FFF",
              mb: 1,
            }}
          >
            <strong>NAMA:</strong>
          </Typography>
          <Box
            sx={{
              p: 1,
              backgroundColor: isJs ? "#470000" : "#FFF",
              color: isJs ? "#FFF" : "#470000",
              borderRadius: "15px",
              mb: 1,
            }}
          >
            <Typography>{participant.name}</Typography>
          </Box>
          <Typography
            sx={{
              fontStyle: "italic",
              color: isJs ? "#470000" : "#FFF",
              mb: 1,
            }}
          >
            <strong>SEKOLAH:</strong>
          </Typography>
          <Box
            sx={{
              p: 1,
              backgroundColor: isJs ? "#470000" : "#FFF",
              color: isJs ? "#FFF" : "#470000",
              borderRadius: "15px",
              mb: 1,
            }}
          >
            <Typography>
              <strong>{participant.school.name}</strong>
            </Typography>
          </Box>
          {isOfficial && (
            <>
              <Typography
                sx={{
                  fontStyle: "italic",
                  color: isJs ? "#470000" : "#FFF",
                  mb: 1,
                }}
              >
                <strong>JABATAN:</strong>
              </Typography>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: isJs ? "#470000" : "#FFF",
                  color: isJs ? "#FFF" : "#470000",
                  borderRadius: "15px",
                  mb: 1,
                }}
              >
                <Typography>{officialPosition}</Typography>
              </Box>
            </>
          )}

          <Typography
            sx={{ fontSize: "25px", color: isJs ? "#470000" : "#FFF", mt: 4 }}
          >
            #Theleagueofchampions
          </Typography>
        </Box>
      </Box>

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
