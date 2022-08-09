import { useState } from "react";
import { useRouter } from "next/router";
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
import { Group, Settings, Home } from "@mui/icons-material";

export default function Navigation() {
  const { push, asPath } = useRouter();
  const [value, setValue] = useState(asPath);
  const onClick = (path) => (e) => {
    e.preventDefault();
    push(path);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={4}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={onClick("/")}
          label={
            <Typography
              color={value === "/" ? "secondary" : undefined}
              variant="span"
            >
              Home
            </Typography>
          }
          value="/"
          icon={<Home color={value === "/" ? "secondary" : undefined} />}
        />

        <BottomNavigationAction
          onClick={onClick("/participant")}
          label={
            <Typography
              color={value === "/participant" ? "secondary" : undefined}
              variant="span"
            >
              Peserta
            </Typography>
          }
          value="/participant"
          color={value === "/participant" ? "secondary" : undefined}
          icon={
            <Group color={value === "/participant" ? "secondary" : undefined} />
          }
        />
        <BottomNavigationAction
          onClick={onClick("/setting")}
          label={
            <Typography
              color={value === "/setting" ? "secondary" : undefined}
              variant="span"
            >
              Pengaturan
            </Typography>
          }
          value="/setting"
          color={value === "/setting" ? "secondary" : undefined}
          icon={
            <Settings color={value === "/setting" ? "secondary" : undefined} />
          }
        />
      </BottomNavigation>
    </Paper>
  );
}
