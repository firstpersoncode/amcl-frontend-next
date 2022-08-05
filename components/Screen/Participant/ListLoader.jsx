import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

export default function ListLoader() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" animation="wave" />}
          secondary={<Skeleton variant="text" animation="wave" />}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" animation="wave" />}
          secondary={<Skeleton variant="text" animation="wave" />}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" animation="wave" />}
          secondary={<Skeleton variant="text" animation="wave" />}
        />
      </ListItem>
    </List>
  );
}
