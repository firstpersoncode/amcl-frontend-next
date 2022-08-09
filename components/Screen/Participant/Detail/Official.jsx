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
import { Close, Person } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import Uploader from "components/Uploader";
import Loader from "../Loader";
import { useAppSessionContext } from "context/AppSession";
import Link from "next/link";

export default function Official({ onClose, fetchRows, participant = {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ ...participant });
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const [message, setMessage] = useState("");
  const [openDialogMessage, setOpenDialogMessage] = useState(false);

  const toggleMessage = () => {
    setOpenDialogMessage(!openDialogMessage);
  };

  const handleChange = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((v) => ({ ...v, [name]: undefined }));
  };

  useEffect(() => {
    let dirty = false;
    for (const field in participant) {
      if (participant[field] !== values[field]) {
        dirty = true;
        break;
      }
    }
    setIsDirty(dirty);
  }, [participant, values]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDirty) return;
    setOpenConfirm(true);
  };

  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const fileAvatar =
    values.files?.length && values.files.find((file) => file.type === "avatar");

  const [avatar, setAvatar] = useState();
  const handleChangeAvatar = ({ image }) => {
    setAvatar(image);
    setIsDirty(true);
  };
  const uploadAvatarToServer = (ownerId) => {
    const body = new FormData();
    body.append("file", avatar);
    body.append("type", "avatar");
    body.append("ownerId", ownerId);
    return axios.post("/api/common/upload", body);
  };

  const fileLicense =
    values.files?.length &&
    values.files.find((file) => file.type === "license");

  const [license, setLicense] = useState();
  const handleChangeLicense = ({ image }) => {
    setLicense(image);
    setIsDirty(true);
  };
  const uploadLicenseToServer = (ownerId) => {
    const body = new FormData();
    body.append("file", license);
    body.append("type", "license");
    body.append("ownerId", ownerId);
    return axios.post("/api/common/upload", body);
  };

  const handleUpdate = async () => {
    const data = {};
    for (const field in participant) {
      if (participant[field] !== values[field]) {
        data[field] = values[field];
      }
    }

    setIsLoading(true);
    try {
      await axios.post("/api/common/participant/update", {
        idString: participant.idString,
        participant: { ...data, avatar: undefined },
      });

      if (avatar) await uploadAvatarToServer(participant.id);
      if (license) await uploadLicenseToServer(participant.id);
    } catch (err) {
      if (err.response?.data) {
        setMessage(err.response.data);
        toggleMessage();
      }
      console.error(err.response?.data || err);
    }

    setIsLoading(false);
    closeConfirm();
    setIsDirty(false);
    fetchRows();
    onClose();
  };

  const [openConfirmArchive, setOpenConfirmArchive] = useState(false);

  const handleSubmitArchive = (e) => {
    e.preventDefault();
    setOpenConfirmArchive(true);
  };

  const closeConfirmArchive = () => {
    setOpenConfirmArchive(false);
  };

  const handleArchive = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/common/participant/archive", {
        idString: participant.idString,
      });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    closeConfirmArchive();
    onClose();
    fetchRows();
  };

  return (
    <>
      {isLoading && <Loader />}
      <DialogTitle>
        <Typography sx={{ mb: 2 }} variant="h6">
          {participant.name}
        </Typography>
        <a
          href={"/id/" + participant.idString}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            sx={{ textTransform: "unset" }}
            variant="contained"
            color="secondary"
            size="small"
          >
            <Person sx={{ mr: 1 }} />
            <Typography sx={{ fontSize: "12px" }}>
              {participant.idString}
            </Typography>
          </Button>
        </a>
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              value={avatar || fileAvatar}
              onChange={handleChangeAvatar}
            />

            <Uploader
              label="Foto License"
              type="license"
              value={license || fileLicense}
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
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          sx={{ textTransform: "unset" }}
          color="secondary"
          disabled={isLoading}
          onClick={handleSubmitArchive}
        >
          Hapus
        </Button>
        <Button
          type="submit"
          sx={{ textTransform: "unset" }}
          disabled={isLoading || !isDirty}
          onClick={handleSubmit}
        >
          Simpan
        </Button>
      </DialogActions>

      <Dialog open={openConfirmArchive} onClose={closeConfirmArchive}>
        <DialogContent>
          Apakah Anda yakin ingin menghapus data ini?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmArchive}>Batal</Button>
          <Button onClick={handleArchive}>Hapus</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirm} onClose={closeConfirm}>
        <DialogContent>
          Apakah Anda yakin ingin menyimpan perubahan?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Batal</Button>
          <Button onClick={handleUpdate}>Simpan</Button>
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
