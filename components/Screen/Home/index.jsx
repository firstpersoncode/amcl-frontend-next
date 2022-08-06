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
      <Card elevation={0} sx={{ my: 4, backgroundColor: "#eee" }}>
        <CardContent>
          <Typography sx={{ mb: 2 }}>
            Status akun:{" "}
            {user.active ? (
              <Chip
                size="small"
                label="Aktif"
                color="success"
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
          {user.active ? (
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
        </CardContent>
        {user.active && (
          <CardActions>
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

      <News />
    </>
  );
}
