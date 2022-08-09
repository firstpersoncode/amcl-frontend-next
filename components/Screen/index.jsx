import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";
import AppLayout from "../AppLayout";

import Home from "./Home";
import Participant from "./Participant";
import Setting from "./Setting";
import { Box, Dialog, DialogContent } from "@mui/material";
import { useAppSessionContext } from "context/AppSession";
import { useEffect, useState } from "react";

const containerStyle = { minHeight: "100vh", p: 3 };

export default function Page() {
  const user = useAppSessionContext();
  const { asPath, push } = useRouter();
  const paths = ["/", "/participant", "/setting"];

  const handleChangeIndex = (index) => {
    push(paths[index]);
  };

  const [openDialogMessage, setOpenDialogMessage] = useState(false);
  const toggleDialogMessage = () => {
    setOpenDialogMessage((v) => !v);
  };
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user.active) {
      setMessage(
        "Akun Anda sedang dalam proses konfirmasi. Silahkan tunggu beberapa saat lagi"
      );

      setOpenDialogMessage(true);
    }
  }, [user.active]);

  return (
    <AppLayout>
      <SwipeableViews
        disableLazyLoading={false}
        index={paths.findIndex((p) => p === asPath)}
        onChangeIndex={handleChangeIndex}
      >
        <Box sx={containerStyle}>{asPath === "/" && <Home />}</Box>

        <Box sx={containerStyle}>
          {asPath === "/participant" && <Participant />}
        </Box>

        <Box sx={containerStyle}>{asPath === "/setting" && <Setting />}</Box>
      </SwipeableViews>

      <Dialog open={openDialogMessage} onClose={toggleDialogMessage}>
        <DialogContent>{message}</DialogContent>
      </Dialog>
    </AppLayout>
  );
}
