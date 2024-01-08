import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import "../style.css"

const defaultTheme = createTheme();

function UserRegistration() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let wallet = 0;
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    axios.post("https://project-wmxw.onrender.com/user-signin", { email })
    .then((res) => {
      if(res.data.status === "Success") {
        alert("no");
      }  
    })
    .then(() => {
      axios
          .post("https://project-wmxw.onrender.com/register", {
            firstname,
            lastname,
            phone,
            email,
            password,
            wallet,
          })
          .then((result) => {
            console.log(result);
            navigate("/user-signin");
          })
          .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="user-registratin-div" >
      <Card className="user-registration-card" style={{height:"100vh"}}>
      <Typography style={{marginTop:"50px", fontSize:"3rem"}} variant="h5">REGISTRATION</Typography>
      <CardContent>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="lastname"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    autoFocus
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="phone"
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    autoFocus
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegistration}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Container>
        </CardContent>
        </Card>
    </div>
  );
}

export default UserRegistration;
