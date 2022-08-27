import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import SwipeableViews from "react-swipeable-views";

export default function News() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        News
      </Typography>
      <Box sx={{ m: "-4px" }}>
        <SwipeableViews style={{ paddingRight: "40px" }}>
          <Box sx={{ p: "4px" }}>
            <Card elevation={4}>
              <CardMedia
                component="img"
                height="180"
                image="https://cdn.idntimes.com/content-images/post/20191021/antarafoto-psm-makassar-kalah-melawan-persija-jakarta-201019-abhe-2-bbc02b0a3424164c1c8933010eae9882_600x400.jpg"
                alt="https://cdn.idntimes.com/content-images/post/20191021/antarafoto-psm-makassar-kalah-melawan-persija-jakarta-201019-abhe-2-bbc02b0a3424164c1c8933010eae9882_600x400.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  PSM Vs Persija, Ujian Berat bagi Juku Eja
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kedua tim sama-sama ingin bertahan di jalur kemenangan
                </Typography>
              </CardContent>
              <CardActions>
                <a
                  href="https://sulsel.idntimes.com/sport/soccer/ahmad-hidayat-alsair/psm-vs-persija-ujian-berat-bagi-juku-eja"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="small" sx={{ textTransform: "unset" }}>
                    Selengkapya
                  </Button>
                </a>
              </CardActions>
            </Card>
          </Box>

          <Box sx={{ p: "4px" }}>
            <Card elevation={4}>
              <CardMedia
                component="img"
                height="180"
                image="https://cdn.idntimes.com/content-images/post/20220804/untitled-design-6-1a06aca5ccacac2e0a3623875cdc40d1_600x400.png"
                alt="https://cdn.idntimes.com/content-images/post/20220804/untitled-design-6-1a06aca5ccacac2e0a3623875cdc40d1_600x400.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pelatih PSM Klaim Kantongi Resep Jinakkan Persija
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Juku Eja jalani latihan tertutup jelang laga pekan ketiga
                </Typography>
              </CardContent>
              <CardActions>
                <a
                  href="https://sulsel.idntimes.com/sport/soccer/ahmad-hidayat-alsair/pelatih-psm-klaim-kantongi-resep-jinakkan-persija"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="small" sx={{ textTransform: "unset" }}>
                    Selengkapya
                  </Button>
                </a>
              </CardActions>
            </Card>
          </Box>

          <Box sx={{ p: "4px" }}>
            <Card elevation={4}>
              <CardMedia
                component="img"
                height="180"
                image="https://cdn.idntimes.com/content-images/post/20220805/antarafoto-latihan-psm-makassar-di-stadion-kalegowa-250722-abhe-3-1cc998536238aa0553b0e44f88ac749f_600x400.jpg"
                alt="https://cdn.idntimes.com/content-images/post/20220805/antarafoto-latihan-psm-makassar-di-stadion-kalegowa-250722-abhe-3-1cc998536238aa0553b0e44f88ac749f_600x400.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Imbang 1-1, Persija Hentikan Tren Kemenangan PSM
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gol Kenzo Nambu dibalas Hanno Behrens
                </Typography>
              </CardContent>
              <CardActions>
                <a
                  href="https://sulsel.idntimes.com/sport/soccer/ahmad-hidayat-alsair/imbang-1-1-persija-hentikan-tren-kemenangan-psm"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="small" sx={{ textTransform: "unset" }}>
                    Selengkapya
                  </Button>
                </a>
              </CardActions>
            </Card>
          </Box>
        </SwipeableViews>
      </Box>
    </Box>
  );
}
