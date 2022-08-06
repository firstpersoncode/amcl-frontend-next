import { useState } from "react";
import {
  Avatar,
  Button,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppSessionContext } from "context/AppSession";
import Detail from "./Detail";
import Create from "./Create";

export default function ListParticipant({ type, participants, fetchRows }) {
  const user = useAppSessionContext();

  const [openDetail, setOpenDetail] = useState(false);
  const toggleDetail = () => {
    setOpenDetail(!openDetail);
  };

  const [openCreate, setOpenCreate] = useState(false);
  const toggleCreate = () => {
    setOpenCreate(!openCreate);
  };

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const onClickParticipant = (i) => () => {
    setSelectedParticipant(i);
    toggleDetail();
  };

  const maxPlayer =
    type === "official"
      ? user.category === "univ"
        ? participants.length >= 2
        : participants.length >= 3
      : participants.length >= 14;
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {participants.map((p, i) => (
          <ListItemButton
            key={`item-${i}`}
            alignItems="flex-start"
            onClick={onClickParticipant(i)}
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

      <Button
        onClick={toggleCreate}
        disabled={maxPlayer || !user.active || user.completed}
        fullWidth
        size="large"
        variant="contained"
        sx={{ textTransform: "unset" }}
      >
        <Add sx={{ mr: 1 }} />
        Tambah {type === "participant" ? "peserta" : type}
      </Button>

      <Create
        open={openCreate}
        type={type}
        onClose={toggleCreate}
        fetchRows={fetchRows}
      />

      <Detail
        open={openDetail}
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
