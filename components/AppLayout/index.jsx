import { Box, Toolbar } from "@mui/material";
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
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <Navigation />
    </>
  );
}
