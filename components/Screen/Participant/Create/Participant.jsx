import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Person } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import Uploader from "components/Uploader";
import Loader from "../Loader";
import { useAppSessionContext } from "context/AppSession";

export default function Participant({ onClose, fetchRows }) {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((v) => ({ ...v, [name]: undefined }));
  };

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenConfirm(true);
  };

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const user = useAppSessionContext();

  const isFutsal = user.branch === "futsal";
  const isUniv = user.category === "univ";

  const [avatar, setAvatar] = useState();
  const [submitAvatar, setSubmitAvatar] = useState(false);

  const handleChangeAvatar = ({ image }) => {
    setAvatar(image);
  };

  const onFinishUploadAvatar = useCallback(() => {
    setSubmitAvatar(false);
  }, []);

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/participants/create", {
        participant: {
          ...values,
          active: true,
          archived: false,
        },
      });

      if (res.data?.id) {
        setValues((v) => ({ ...v, id: res.data.id }));
        if (avatar) setSubmitAvatar(true);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    closeConfirm();
    fetchRows();
    onClose();
  };

  return (
    <>
      {isLoading && <Loader />}

      <DialogTitle>
        <Typography sx={{ mb: 2 }} variant="h6">
          Peserta
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item sm={7} xs={12}>
              <TextField
                required
                sx={{ mb: 2 }}
                size="small"
                fullWidth
                name="name"
                label="Nama"
                variant="standard"
                value={values.name || ""}
                onChange={handleChange("name")}
                helperText={errors.name}
              />

              <TextField
                required
                sx={{ mb: 2 }}
                size="small"
                fullWidth
                name="email"
                label="Email"
                variant="standard"
                value={values.email || ""}
                onChange={handleChange("email")}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Tanggal lahir"
                  value={values.dob || ""}
                  inputFormat="dd/MM/yyyy"
                  onChange={(value) => {
                    handleChange("dob")({ target: { value } });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      name="dob"
                      error={Boolean(errors.dob)}
                      helperText={errors.dob}
                    />
                  )}
                />
              </LocalizationProvider>

              <TextField
                required
                sx={{ mb: 2 }}
                size="small"
                fullWidth
                name="studentId"
                label="NIS/NIM"
                variant="standard"
                value={values.studentId || ""}
                onChange={handleChange("studentId")}
                error={Boolean(errors.studentId)}
                helperText={errors.studentId}
              />

              {!isUniv && (
                <TextField
                  required
                  sx={{ mb: 2 }}
                  size="small"
                  fullWidth
                  name="class"
                  label="Kelas"
                  variant="standard"
                  value={values.class || ""}
                  onChange={handleChange("class")}
                  error={Boolean(errors.class)}
                  helperText={errors.class}
                />
              )}

              <TextField
                required
                sx={{ mb: 2 }}
                size="small"
                fullWidth
                name="phone"
                label="No. Telephone"
                variant="standard"
                value={values.phone || ""}
                onChange={handleChange("phone")}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
              />

              <TextField
                required
                sx={{ mb: 2 }}
                size="small"
                fullWidth
                select
                name="gender"
                label="Gender"
                value={values.gender || ""}
                onChange={handleChange("gender")}
                error={Boolean(errors.gender)}
                helperText={errors.gender}
              >
                <MenuItem value="male">Pria</MenuItem>
                <MenuItem value="female">Wanita</MenuItem>
              </TextField>

              {isFutsal && (
                <TextField
                  required
                  sx={{ mb: 2 }}
                  size="small"
                  fullWidth
                  select
                  name="futsalPosition"
                  label="Posisi"
                  value={values.futsalPosition || ""}
                  onChange={handleChange("futsalPosition")}
                  error={Boolean(errors.futsalPosition)}
                  helperText={errors.futsalPosition}
                >
                  <MenuItem value="goal">Penjaga Gawang</MenuItem>
                  <MenuItem value="back">Pertahanan</MenuItem>
                  <MenuItem value="mid">Tengah</MenuItem>
                  <MenuItem value="forward">Penyerang</MenuItem>
                </TextField>
              )}
            </Grid>

            <Grid item sm={5} xs={12}>
              <Uploader
                label="Foto Profile"
                type="avatar"
                value={avatar}
                ownerId={values.id}
                submit={submitAvatar}
                onChange={handleChangeAvatar}
                onUpload={onFinishUploadAvatar}
              />

              <TextField
                sx={{ mb: 6 }}
                size="small"
                fullWidth
                name="instagram"
                label="Instagram"
                variant="standard"
                value={values.instagram || ""}
                onChange={handleChange("instagram")}
                error={Boolean(errors.instagram)}
                helperText={errors.instagram}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
            Simpan
          </Button>
        </DialogActions>
      </form>

      <Dialog open={openConfirm} onClose={closeConfirm}>
        <DialogContent>
          Apakah Anda yakin ingin membuat peserta baru?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Batal</Button>
          <Button onClick={handleCreate}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
