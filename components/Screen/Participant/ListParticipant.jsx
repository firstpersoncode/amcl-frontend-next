import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function ListParticipant({ participants }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {participants.map((p, i) => (
        <>
          <ListItemButton key={`item-${i}`} alignItems="flex-start">
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
          {i !== participants.length - 1 && (
            <Divider key={`divider-${i}`} variant="inset" component="li" />
          )}
        </>
      ))}
    </List>
  );
}
