import { Box, Divider, Toolbar, Typography } from "@mui/material";
import MetaHead from "./MetaHead";
import AppBar from "./AppBar";
import Navigation from "./Navigation";

export default function AppLayout({ children }) {
  return (
    <>
      <MetaHead />
      <AppBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          paddingBottom: "100px",
        }}
      >
        <Toolbar />
        {children}
        <Typography
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
        </Typography>
      </Box>
      <Navigation />
    </>
  );
}
