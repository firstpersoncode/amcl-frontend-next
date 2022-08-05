import { useState } from "react";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Detail from "./Detail";

export default function ListParticipant({ type, participants, fetchRows }) {
  const [open, setOpen] = useState(false);
  const toggleDetail = () => {
    setOpen(!open);
  };

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const onClickParticipant = (i) => () => {
    setSelectedParticipant(i);
    toggleDetail();
  };

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {participants.map((p, i) => (
          <ListItemButton
            key={`item-${i}`}
            alignItems="flex-start"
            onClick={onClickParticipant(i)}
            sx={{ borderBottom: "1px solid rgba(0,0,0,0.15)" }}
          >
            <ListItemAvatar>
              {p.avatar ? (
                <Avatar
                  alt={p.avatar.url}
                  src={p.avatar.url}
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar width={40} height={40} />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={<Typography color="text.primary">{p.name}</Typography>}
              secondary={
                <Typography variant="body2" color="text.primary">
                  {p.email}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>

      <Detail
        open={open}
        participant={
          typeof selectedParticipant !== "null" &&
          participants[selectedParticipant]
        }
        type={type}
        onClose={toggleDetail}
        fetchRows={fetchRows}
      />
    </>
  );
}
