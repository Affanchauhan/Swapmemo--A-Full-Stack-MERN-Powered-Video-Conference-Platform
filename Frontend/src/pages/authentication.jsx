import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 600,
          transition: "all 0.3s ease",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      let message = err.response.data.message;
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage:
            "url(https://i.pinimg.com/736x/1c/cb/2c/1ccb2cec6cdb4f2bfbd44709b7c47355.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: { xs: "none", sm: "block" },
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(25, 118, 210, 0.8)",
              background:
                "linear-gradient(to right, rgba(25, 118, 210, 0.8), rgba(72, 137, 202, 0.4))",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ mb: 2, fontWeight: 700 }}
            >
              {formState === 0 ? "Welcome Back!" : "Join Us Today"}
            </Typography>
            <Typography variant="h6">
              {formState === 0
                ? "Sign in to access your personalized dashboard"
                : "Create an account to get start the Meeting"}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
                width: 56,
                height: 56,
              }}
            >
              <LockOutlinedIcon fontSize="medium" />
            </Avatar>

            <Typography
              component="h1"
              variant="h5"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              {formState === 0 ? "Sign in" : "Sign up"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 3,
                p: 1,
                borderRadius: 2,
                bgcolor: "rgba(0, 0, 0, 0.04)",
              }}
            >
              <Button
                variant={formState === 0 ? "contained" : "text"}
                onClick={() => {
                  setFormState(0);
                  setError("");
                }}
                sx={{
                  px: 3,
                  borderRadius: 1,
                  boxShadow:
                    formState === 0 ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                }}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? "contained" : "text"}
                onClick={() => {
                  setFormState(1);
                  setError("");
                }}
                sx={{
                  px: 3,
                  borderRadius: 1,
                  boxShadow:
                    formState === 1 ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                }}
              >
                Sign Up
              </Button>
            </Box>

            <Box
              component="form"
              noValidate
              sx={{
                mt: 1,
                width: "100%", // Ensures full width of parent container
                maxWidth: 600, // Optional: Set a max-width for better control
              }}
            >
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoFocus={formState === 0}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                sx={{ mb: 2 }}
              />

              {error && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{
                    mt: 1,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: "rgba(220, 0, 78, 0.08)",
                    textAlign: "center",
                  }}
                >
                  {error}
                </Typography>
              )}

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  },
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Sign In" : "Create Account"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        }}
      />
    </ThemeProvider>
  );
}
