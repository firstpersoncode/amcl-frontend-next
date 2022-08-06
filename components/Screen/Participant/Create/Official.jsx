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

export default function Official({ onClose, fetchRows }) {
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

  const fileAvatar =
    values.files?.length && values.files.find((file) => file.type === "avatar");

  const [avatar, setAvatar] = useState();
  const [submitAvatar, setSubmitAvatar] = useState(false);

  const handleChangeAvatar = ({ image }) => {
    setAvatar(image);
  };

  const onFinishUploadAvatar = useCallback(() => {
    setSubmitAvatar(false);
  }, []);

  const [license, setLicense] = useState();
  const [submitLicense, setSubmitLicense] = useState(false);

  const handleChangeLicense = ({ image }) => {
    setLicense(image);
  };

  const onFinishUploadLicense = useCallback(() => {
    setSubmitLicense(false);
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
        if (license) setSubmitLicense(true);
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
                value={license}
                ownerId={values.id}
                submit={submitAvatar}
                onChange={handleChangeAvatar}
                onUpload={onFinishUploadAvatar}
              />

              <Uploader
                label="Foto License"
                type="license"
                value={fileLicense}
                ownerId={values.id}
                submit={submitLicense}
                onChange={handleChangeLicense}
                onUpload={onFinishUploadLicense}
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
          Apakah Anda yakin ingin membuat official baru?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm}>Batal</Button>
          <Button onClick={handleCreate}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}