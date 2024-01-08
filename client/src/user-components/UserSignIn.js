import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";
import { Card, CardContent, Typography } from "@mui/material";

const defaultTheme = createTheme();

function UserSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const handleUserRegister = () => {
    localStorage.setItem("userSignIn", false);
    navigate("/user-registration");
  };

  localStorage.setItem("userSignIn", false);

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post("https://project-wmxw.onrender.com/user-signin", { email, password })
      .then((result) => {
        // console.log(result);
        if (result.data.status === "Success") {
          navigate("/");
          localStorage.setItem("userSignIn", true);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("firstname", result.data.firstname);
          localStorage.setItem("lastname", result.data.lastname);
          console.log(result.data);
          localStorage.setItem("wallet", result.data.wallet);
        } else {
          setLoginError(true);
          setTimeout(() => {
            setLoginError(false);
          }, 5000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="user-signin-div">
      <Card className="user-signin-card">
        <Typography
          style={{ marginTop: "50px", fontSize: "3rem" }}
          variant="h5"
        >
          USER
        </Typography>
        <CardContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
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
                {loginError && (
                  <Grid container justifyContent="flex-start">
                    <Grid item>
                      <p
                        style={{
                          color: "red",
                          fontSize: "14px",
                          marginTop: "5px",
                        }}
                      >
                        Id or Password miss match
                      </p>
                    </Grid>
                  </Grid>
                )}
                <Button
                  type="submit"
                  color="inherit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Grid
                  style={{ marginTop: "20px" }}
                  container
                  justifyContent="flex-end"
                >
                  <Grid item>
                    New User?
                    <Button variant="outlined" color="inherit" onClick={handleUserRegister}>
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserSignIn;
