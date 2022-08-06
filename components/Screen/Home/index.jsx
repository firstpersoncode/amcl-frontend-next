import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useAppSessionContext } from "context/AppSession";
import Link from "next/link";
import News from "./News";

export default function Home() {
  const user = useAppSessionContext();

  return (
    <>
      <Typography variant="h6">Selamat datang!</Typography>
      <Typography variant="h5">{user.name}</Typography>
      <Card elevation={0} sx={{ my: 2, backgroundColor: "#eee" }}>
        <CardContent sx={{ display: "flex" }}>
          <InfoOutlined color="secondary" sx={{ mr: 2 }} />
          <Box>
            <Typography sx={{ mb: 2 }}>
              Status akun:{" "}
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
                  color="secondary"
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
                <br />
                Selamat berjuang!
              </Typography>
            ) : user.active ? (
              <Typography variant="body2">
                Saat ini Anda sudah dapat melengkapi{" "}
                <Link href="/participant" passHref>
                  <a>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "inline",
                        color: (theme) => theme.palette.secondary.main,
                        fontWeight: "bold",
                      }}
                    >
                      data peserta
                    </Typography>
                  </a>
                </Link>{" "}
                untuk tim {user.branch === "futsal" ? "Futsal" : "Dance"} Anda.
                <br />
                <br />
                {"'Segera selesaikan pendaftaran sebelum hari pertandingan.'"}
              </Typography>
            ) : (
              <Typography variant="body2">
                Anda belum dapat melakukan pendaftaran peserta.
                <br />
                Mohon menunggu beberapa saat lagi.
              </Typography>
            )}
          </Box>
        </CardContent>
        {user.active && (
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/participant" passHref>
              <a>
                <Button
                  sx={{ textTransform: "unset" }}
                  color="secondary"
                  variant="contained"
                  size="small"
                >
                  Daftarkan Peserta
                </Button>
              </a>
            </Link>
          </CardActions>
        )}
      </Card>

      {!user.completed && user.active && (
        <Card elevation={0} sx={{ my: 2, backgroundColor: "#eee" }}>
          <CardContent sx={{ display: "flex" }}>
            <InfoOutlined color="secondary" sx={{ mr: 2 }} />
            <Typography variant="body2">
              Jika Anda telah selesai mengisi data peserta Anda, segera aktifkan
              QR Code untuk semua peserta dengan pergi ke menu{" "}
              <Link href="/setting" passHref>
                <a>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "inline",
                      color: (theme) => theme.palette.secondary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Setting
                  </Typography>
                </a>
              </Link>
              , lalu klik tombol {`"Generate QR Code"`}.
            </Typography>
          </CardContent>
        </Card>
      )}

      <News />
    </>
  );
}
