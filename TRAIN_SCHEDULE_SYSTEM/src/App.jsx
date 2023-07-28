import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function App() {
  const [token, setToken] = useState("");
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post("http://20.244.56.144/train/auth", {
          companyName: "Train Corp",
          clientID: "16904bf6-a3df-452c-9347-d80621493008",
          clientSecret: "OQoADgpPjFNhOhmD",
          ownerName: "Shayama",
          ownerEmail: "test@test.com",
          rollNo: "01920802720",
        });
        const accessToken = response.data.access_token;
        setToken(accessToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://20.244.56.144/train/trains",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTrains(response.data);
        }
      } catch (error) {
        console.error("Error fetching trains:", error);
      }
    };

    fetchTrains();
  }, [token]);

  console.log(trains);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Train Finder
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Train Running Corp
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Best Train Finder available
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Contact Us</Button>
              <Button variant="outlined">Train Running Status</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {trains.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?train"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.trainName}
                    </Typography>
                    <Typography>Delayed By. : {card.delayedBy} mins</Typography>
                    <Typography gutterBottom variant="h6" component="h2">Price: </Typography>
                    {Object.entries(card.price).map(([key, value]) => (
                      <Typography>{key} : {value}Rs. </Typography>
                    ))}
                    <Typography gutterBottom variant="h6" component="h2">Departure Time</Typography>
                    {Object.entries(card.departureTime).map(([key, value]) => (
                      <Typography>{key} : {value}</Typography>
                    ))}
                    
                    <Typography gutterBottom variant="h6" component="h2">Seat Available</Typography>
                    {Object.entries(card.seatsAvailable).map(([key, value]) => (
                      <Typography>{key} : {value}</Typography>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button size="small">Book </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Built with 🤟
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Train Finder @2023
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;
