import { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField, Typography, Box } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Premium Navbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
          zIndex: 10,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #3a7bd5,rgb(0, 145, 255))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Swapmemo
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <IconButton
            onClick={() => navigate("/history")}
            sx={{
              backgroundColor: "white",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
            }}
          >
            <RestoreIcon sx={{ color: "#3a7bd5" }} />
            &nbsp;
            <Typography variant="body1" sx={{ color: "#5f6368" }}>
              Meeting History
            </Typography>
          </IconButton>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            variant="outlined"
            sx={{
              borderColor: "#3a7bd5",
              color: "#3a7bd5",
              "&:hover": {
                backgroundColor: "rgba(58, 123, 213, 0.04)",
                borderColor: "#3a7bd5",
              },
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          background: "rgb(242, 248, 254)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            px: 4,
          }}
        >
          {/* Left Panel */}
          <Box sx={{ flex: 1, pr: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#2d3748",
                lineHeight: 1.2,
              }}
            >
              Where Connections <br />
              <Box component="span" sx={{ color: "#3a7bd5" }}>
                Come Alive
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                color: "#4a5568",
                mb: 4,
                maxWidth: 500,
                lineHeight: 1.6,
              }}
            >
              Experience crystal-clear video calls with industry-leading
              quality. Connect with anyone, anywhere, with just a simple code.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                label="Enter Meeting Code"
                variant="outlined"
                sx={{
                  flex: 1,
                  maxWidth: 400,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                InputProps={{
                  style: {
                    height: 48,
                  },
                }}
              />
              <Button
                onClick={handleJoinVideoCall}
                variant="contained"
                sx={{
                  height: 48,
                  px: 4,
                  borderRadius: "8px",
                  background: "linear-gradient(45deg, #3a7bd5, #00d2ff)",
                  boxShadow: "0 4px 6px rgba(58, 123, 213, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 8px rgba(58, 123, 213, 0.4)",
                  },
                }}
              >
                Join Now
              </Button>
            </Box>
          </Box>

          {/* Right Panel */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="video"
              src="https://media.zoom.com/download/assets/Homepage+Animation+Cropped+V02.mp4/df7a6e0a3b1411f080d53a3a2f07be54"
              autoPlay
              loop
              muted
              playsInline
              alt="Video Conference Illustration"
              sx={{
                maxWidth: "100%",
                height: "auto",
                filter: "drop-shadow(0 20px 30px rgb(242, 248, 254))",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default withAuth(HomeComponent);
