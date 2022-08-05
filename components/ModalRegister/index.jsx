import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import useForm from "./hooks/useForm";
import Loader from "./Loader";
import PasswordField from "components/PasswordField";

export default function ModalRegister() {
  const {
    isLoading,
    values,
    errors,
    message,
    captcha,
    handleChange,
    handleSubmit,
    onCaptchaVerify,
    resetCaptcha,
  } = useForm();

  const [openDialogMessage, setOpenDialogMessage] = useState(false);
  useEffect(() => {
    if (message) setOpenDialogMessage(true);
  }, [message]);

  const handleCloseDialogMessage = () => {
    setOpenDialogMessage(false);
  };

  return (
    <>
      <Dialog open>
        <Card
          sx={{
            position: "relative",
          }}
        >
          {isLoading && <Loader />}
          <Box sx={{ filter: isLoading ? "blur(4px)" : undefined }}>
            <CardMedia
              component="img"
              height="80"
              image="/banner.webp"
              alt="Banner"
            />
            <form onSubmit={handleSubmit}>
              <CardContent>
                <TextField
                  autoFocus
                  fullWidth
                  name="name"
                  label="Nama Sekolah"
                  variant="standard"
                  value={values.name || ""}
                  onChange={handleChange("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />

                <Grid container sx={{ my: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      select
                      label="Kategori"
                      value={values.category || ""}
                      onChange={handleChange("category")}
                      error={Boolean(errors.category)}
                      helperText={errors.category}
                    >
                      {[
                        { value: "js", label: "SMP" },
                        { value: "hs", label: "SMA" },
                        { value: "univ", label: "Universitas" },
                      ].map((option, i) => (
                        <MenuItem key={i} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      select
                      label="Cabang"
                      value={values.branch || ""}
                      onChange={handleChange("branch")}
                      error={Boolean(errors.branch)}
                      helperText={errors.branch}
                    >
                      {[
                        { value: "futsal", label: "Futsal" },
                        { value: "dance", label: "Dance" },
                      ].map((option, i) => (
                        <MenuItem key={i} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="standard"
                  value={values.email || ""}
                  onChange={handleChange("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />

                <PasswordField
                  value={values.password || ""}
                  onChange={handleChange("password")}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />

                <Box sx={{ textAlign: "right" }}>
                  <Link href="/login" passHref>
                    <a>
                      <Button sx={{ textTransform: "unset" }}>
                        Sudah punya akun? Masuk disini
                      </Button>
                    </a>
                  </Link>
                </Box>
              </CardContent>

              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Daftar
                </Button>
              </DialogActions>
            </form>
          </Box>
        </Card>
      </Dialog>

      <Dialog open={openDialogMessage} onClose={handleCloseDialogMessage}>
        <DialogContent>
          <Typography variant="p" component="div" sx={{ textAlign: "center" }}>
            {message}
          </Typography>
        </DialogContent>
      </Dialog>

      <HCaptcha
        ref={captcha}
        size="invisible"
        sitekey={process.env.HCAPTCHA_SITE_KEY}
        onVerify={onCaptchaVerify}
        onError={resetCaptcha}
        onClose={resetCaptcha}
        onChalExpired={resetCaptcha}
      />
    </>
  );
}
