import { useState } from "react";
import { useRouter } from "next/router";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { LabelImportant, Group, Settings } from "@mui/icons-material";

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
          onClick={onClick("/school")}
          label={value === "/school" ? "Sekolah" : ""}
          value="/school"
          icon={<LabelImportant />}
        />
        <BottomNavigationAction
          onClick={onClick("/participant")}
          label={value === "/participant" ? "Peserta" : ""}
          value="/participant"
          icon={<Group />}
        />
        <BottomNavigationAction
          onClick={onClick("/setting")}
          label={value === "/setting" ? "Pengaturan" : ""}
          value="/setting"
          icon={<Settings />}
        />
      </BottomNavigation>
    </Paper>
  );
}
