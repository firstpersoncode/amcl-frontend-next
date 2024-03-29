import { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { Upload } from "@mui/icons-material";

export default function Uploader({
  label,
  value,
  onChange,
  error,
  helperText,
}) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

      onChange({ image: i, objectImage: URL.createObjectURL(i) });
    }
  };

  return (
    <>
      <Typography
        sx={{
          mb: 1,
          color: (theme) => (error ? theme.palette.error.main : undefined),
        }}
      >
        {label}
      </Typography>

      <Card
        sx={{
          mb: 2,
        }}
      >
        {createObjectURL || value?.url ? (
          <CardActionArea component="label">
            <CardMedia
              component="img"
              height="300"
              image={createObjectURL || value?.url}
              alt={image?.name || value?.name}
            />

            <input
              hidden
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadToClient}
            />
          </CardActionArea>
        ) : (
          <Button
            sx={{ textTransform: "unset" }}
            fullWidth
            variant="contained"
            color="secondary"
            component="label"
          >
            <Upload />
            Tambahkan file
            <input
              hidden
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadToClient}
            />
          </Button>
        )}
      </Card>

      {helperText && (
        <Typography
          sx={{
            fontSize: "12px",
            mt: -1,
            color: (theme) => (error ? theme.palette.error.main : undefined),
          }}
        >
          {helperText}
        </Typography>
      )}
    </>
  );
}
