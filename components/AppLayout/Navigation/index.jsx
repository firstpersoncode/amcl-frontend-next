import { useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { LabelImportant, Group, Settings } from "@mui/icons-material";

export default function Navigation() {
  const [value, setValue] = useState("participant");

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
          label={value === "school" ? "Sekolah" : ""}
          value="school"
          icon={<LabelImportant />}
        />
        <BottomNavigationAction
          label={value === "participant" ? "Peserta" : ""}
          value="participant"
          icon={<Group />}
        />
        <BottomNavigationAction
          label={value === "settings" ? "Pengaturan" : ""}
          value="settings"
          icon={<Settings />}
        />
      </BottomNavigation>
    </Paper>
  );
}
