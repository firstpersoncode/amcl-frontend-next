import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";
import AppLayout from "../AppLayout";

import Home from "./Home";
import Participant from "./Participant";
import Setting from "./Setting";
import { Box } from "@mui/material";

const containerStyle = { minHeight: "100vh", p: 3, paddingBottom: "100px" };

export default function Page() {
  const { asPath, push } = useRouter();
  const paths = ["/", "/participant", "/setting"];

  const handleChangeIndex = (index) => {
    push(paths[index]);
  };

  return (
    <AppLayout>
      <SwipeableViews
        index={paths.findIndex((p) => p === asPath)}
        onChangeIndex={handleChangeIndex}
      >
        <Box sx={containerStyle}>
          <Home />
        </Box>

        <Box sx={containerStyle}>
          <Participant />
        </Box>

        <Box sx={containerStyle}>
          <Setting />
        </Box>
      </SwipeableViews>
    </AppLayout>
  );
}
