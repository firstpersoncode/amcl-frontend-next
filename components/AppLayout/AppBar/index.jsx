import Link from "next/link";
import { AppBar as MuiAppBar, Box, Toolbar, Typography } from "@mui/material";
import Loader from "./Loader";
import Image from "next/image";

export default function AppBar() {
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: (theme) => theme.palette.secondary.main,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Link href="/">
            <a>
              <Image width={30} height={40} src="/logo-md.png" alt="Logo" />
            </a>
          </Link>

          <Link href="/" passHref>
            <a>
              <Typography>Makassar Champion League</Typography>
            </a>
          </Link>
        </Box>
      </Toolbar>
      <Loader />
    </MuiAppBar>
  );
}
