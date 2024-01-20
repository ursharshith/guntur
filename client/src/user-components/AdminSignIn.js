import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { CardContent, Typography } from "@mui/material";

const defaultTheme = createTheme();

function AdminSignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  localStorage.setItem("admin", false);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (id === "TSRTC" && password === "admin@123") {
      localStorage.setItem("admin", true);
      navigate("/admin-portal");
    } else {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 5000);
    }
  };

  return (
    <div className="admin_signin_div">
      <Card className="admin-singin-card">
        <Typography
          style={{ marginTop: "50px", fontSize: "3rem" }}
          variant="h5"
        >
          ADMIN
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
                      name="admin id"
                      required
                      fullWidth
                      id="adminid"
                      label="Admin Id"
                      autoFocus
                      onChange={(e) => setId(e.target.value)}
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
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminSignIn;
