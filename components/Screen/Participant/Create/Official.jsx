import { useCallback, useEffect, useState } from "react";
import {
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
import { Close } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import Uploader from "components/Uploader";
import Loader from "../Loader";

export default function Official({ type, onClose, fetchRows }) {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [openDialogMessage, setOpenDialogMessage] = useState(false);

  const toggleMessage = () => {
    setOpenDialogMessage(!openDialogMessage);
  };

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

  const [avatar, setAvatar] = useState();
  const handleChangeAvatar = ({ image }) => {
    setAvatar(image);
  };

  const uploadAvatarToServer = (ownerId) => {
    const body = new FormData();
    body.append("file", avatar);
    body.append("type", "avatar");
    body.append("ownerId", ownerId);
    return axios.post("/api/common/upload?e=user", body);
  };

  const [license, setLicense] = useState();
  const handleChangeLicense = ({ image }) => {
    setLicense(image);
  };

  const uploadLicenseToServer = (ownerId) => {
    const body = new FormData();
    body.append("file", license);
    body.append("type", "license");
    body.append("ownerId", ownerId);
    return axios.post("/api/common/upload?e=user", body);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/common/participant/create?e=user", {
        participant: {
          ...values,
          type,
          active: true,
          archived: false,
        },
      });

      if (res.data?.id) {
        if (avatar) await uploadAvatarToServer(res.data.id);
        if (license) await uploadLicenseToServer(res.data.id);
      }
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
          Official
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

            <TextField
              required
              sx={{ mb: 2 }}
              size="small"
              fullWidth
              select
              name="officialPosition"
              label="Jabatan"
              value={values.officialPosition || ""}
              onChange={handleChange("officialPosition")}
              error={Boolean(errors.officialPosition)}
              helperText={errors.officialPosition}
            >
              <MenuItem value="coach">Pelatih</MenuItem>
              <MenuItem value="coachAssistant">Asisten Pelatih</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="teacher">Guru</MenuItem>
            </TextField>
          </Grid>

          <Grid item sm={5} xs={12}>
            <Uploader
              label="Foto Profile"
              type="avatar"
              value={avatar}
              onChange={handleChangeAvatar}
            />

            <Uploader
              label="Foto License"
              type="license"
              value={license}
              onChange={handleChangeLicense}
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

      <Dialog open={openConfirm} onClose={closeConfirm}>
        <DialogContent>
          Apakah Anda yakin ingin membuat official baru?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Batal</Button>
          <Button onClick={handleCreate}>Simpan</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogMessage} onClose={handleCloseDialogMessage}>
        <DialogContent>
          <Typography variant="p" component="div" sx={{ textAlign: "center" }}>
            {message}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
