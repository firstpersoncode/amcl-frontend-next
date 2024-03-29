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
import generateUID from "utils/generateUID";

export default function Participant({ type, onClose, fetchRows }) {
  const user = useAppSessionContext();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [openDialogMessage, setOpenDialogMessage] = useState(false);

  const [avatar, setAvatar] = useState();

  const toggleMessage = () => {
    setOpenDialogMessage(!openDialogMessage);
  };

  const handleChange = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((v) => ({ ...v, [name]: undefined }));
  };

  const handleChangeAvatar = ({ image }) => {
    setAvatar(image);
    setErrors((v) => ({ ...v, avatar: undefined }));
  };

  const uploadAvatarToServer = (ownerId) => {
    const body = new FormData();
    body.append("file", avatar);
    body.append("type", "avatar");
    body.append("ownerId", ownerId);
    return axios.post("/api/upload", body);
  };

  const isFutsal = user.branch === "futsal";
  const isUniv = user.category === "univ";

  const validate = () => {
    let hasError = false;
    if (!values.name) {
      hasError = true;
      setErrors((v) => ({ ...v, name: "Masukkan nama" }));
    }

    if (!values.email) {
      hasError = true;
      setErrors((v) => ({ ...v, email: "Masukkan email" }));
    } else if (
      !String(values.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      hasError = true;
      setErrors((v) => ({ ...v, email: "Format email tidak benar" }));
    }

    if (!values.dob) {
      hasError = true;
      setErrors((v) => ({ ...v, dob: "Masukkan tanggal lahir" }));
    }

    if (!values.studentId) {
      hasError = true;
      setErrors((v) => ({ ...v, studentId: "Masukkan NIS/NIM" }));
    }

    if (!isUniv && !values.class) {
      hasError = true;
      setErrors((v) => ({ ...v, class: "Masukkan kelas" }));
    }

    if (!values.phone) {
      hasError = true;
      setErrors((v) => ({ ...v, phone: "Masukkan nomor telephone" }));
    } else if (!/^[\s()+-]*(\d[\s()+-]*){6,20}$/.test(values.phone)) {
      hasError = true;
      setErrors((v) => ({ ...v, phone: "Format nomor telephone tidak benar" }));
    }

    if (!values.gender) {
      hasError = true;
      setErrors((v) => ({ ...v, gender: "Masukkan gender" }));
    }

    if (isFutsal && !values.futsalPosition) {
      hasError = true;
      setErrors((v) => ({ ...v, futsalPosition: "Masukkan posisi" }));
    }

    // if (!avatar) {
    //   hasError = true;
    //   setErrors((v) => ({ ...v, avatar: "Masukkan foto profil" }));
    // }

    return hasError;
  };

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = validate();
    if (hasError) return;

    setOpenConfirm(true);
  };

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/participant/create", {
        participant: {
          ...values,
          idString: `${user.idString}-${generateUID()}`,
          schoolId: user.id,
          type,
          active: true,
          archived: false,
        },
      });

      if (res.data?.id && avatar) await uploadAvatarToServer(res.data.id);
    } catch (err) {
      if (err.response?.data) {
        setMessage(err.response.data);
        toggleMessage();
      }
      console.error(err.response?.data || err);
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
              error={Boolean(errors.name)}
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
                <MenuItem value="kiper">Kiper</MenuItem>
                <MenuItem value="anchor">Anchor</MenuItem>
                <MenuItem value="flank">Flank</MenuItem>
                <MenuItem value="pivot">Pivot</MenuItem>
              </TextField>
            )}
          </Grid>

          <Grid item sm={5} xs={12}>
            <Uploader
              label="Foto Profile"
              type="avatar"
              value={avatar}
              onChange={handleChangeAvatar}
              error={Boolean(errors.avatar)}
              helperText={errors.avatar}
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
        <Button
          sx={{ textTransform: "unset" }}
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Simpan
        </Button>
      </DialogActions>

      <Dialog open={openConfirm} onClose={closeConfirm}>
        <DialogContent>
          Apakah Anda yakin ingin membuat peserta baru?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Batal</Button>
          <Button onClick={handleCreate}>Simpan</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogMessage} onClose={toggleMessage}>
        <DialogContent>
          <Typography variant="p" component="div" sx={{ textAlign: "center" }}>
            {message}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
