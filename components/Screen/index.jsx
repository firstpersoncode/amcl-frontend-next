import { useRouter } from "next/router";
import SwipeableViews from "react-swipeable-views";
import AppLayout from "../AppLayout";

import Home from "./Home";
import School from "./School";
import Participant from "./Participant";
import Setting from "./Setting";
import { Box } from "@mui/material";

// const componentPages = {
//   "/": require("./Home").default,
//   "/school": require("./School").default,
//   "/participant": require("./Participant").default,
//   "/setting": require("./Setting").default,
// };

export default function Page() {
  const { asPath, push } = useRouter();
  const paths = ["/", "/school", "/participant", "/setting"];

  const handleChangeIndex = (index) => {
    push(paths[index]);
  };

  // const ComponentPage = componentPages[asPath];
  // if (!ComponentPage) return null;

  return (
    <AppLayout>
      {/* <ComponentPage /> */}

      <SwipeableViews
        index={paths.findIndex((p) => p === asPath)}
        onChangeIndex={handleChangeIndex}
      >
        <Box sx={{ minHeight: "70vh" }}>
          <Home />
        </Box>

        <Box sx={{ minHeight: "70vh" }}>
          <School />
        </Box>

        <Box sx={{ minHeight: "70vh" }}>
          <Participant />
        </Box>

        <Box sx={{ minHeight: "70vh" }}>
          <Setting />
        </Box>
      </SwipeableViews>
    </AppLayout>
  );
}
