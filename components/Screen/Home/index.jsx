import { Group, InfoOutlined, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { useAppSessionContext } from "context/AppSession";
import Link from "next/link";
import { useEffect, useState } from "react";
import News from "./News";

export default function Home() {
  const user = useAppSessionContext();

  return (
    <>
      <Typography variant="h6">Selamat datang!</Typography>
      <Typography variant="h5">{user.name}</Typography>
      <Card elevation={0} sx={{ my: 2, backgroundColor: "#eee" }}>
        <CardContent sx={{ display: "flex" }}>
          <InfoOutlined color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography sx={{ mb: 2 }}>
              {user.completed ? (
                <Chip
                  size="small"
                  label="Completed"
                  color="success"
                  variant="outlined"
                />
              ) : user.active ? (
                <Chip
                  size="small"
                  label="Aktif"
                  color="primary"
                  variant="outlined"
                />
              ) : (
                <Chip
                  size="small"
                  label="Belum Aktif"
                  color="error"
                  variant="outlined"
                />
              )}
            </Typography>

            {user.completed ? (
              <Typography variant="body2">
                Pendaftaran telah selesai, dan QR Code telah dibagikan.
              </Typography>
            ) : user.active ? (
              <Typography variant="body2">
                Lengkapi data{" "}
                <Link href="/participant" passHref>
                  <a>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "inline",
                        color: (theme) => theme.palette.primary.main,
                        fontWeight: "bold",
                      }}
                    >
                      <Group sx={{ fontSize: "15px" }} /> Peserta
                    </Typography>
                  </a>
                </Link>{" "}
                untuk tim {user.branch === "futsal" ? "Futsal" : "Dance"} Anda.
              </Typography>
            ) : (
              <Typography variant="body2">
                Mohon menunggu beberapa saat lagi.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {!user.completed && user.active && (
        <Card elevation={0} sx={{ my: 2, backgroundColor: "#eee" }}>
          <CardContent sx={{ display: "flex" }}>
            <InfoOutlined color="primary" sx={{ mr: 2 }} />
            <Typography variant="body2">
              Jika Anda telah selesai, segera aktifkan QR Code untuk semua
              peserta dengan pergi ke menu{" "}
              <Link href="/setting" passHref>
                <a>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "inline",
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    <Settings sx={{ fontSize: "14px" }} />
                    Pengaturan
                  </Typography>
                </a>
              </Link>
              , lalu klik tombol <strong>{`"Generate QR Code"`}</strong>.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* <News /> */}
    </>
  );
}
