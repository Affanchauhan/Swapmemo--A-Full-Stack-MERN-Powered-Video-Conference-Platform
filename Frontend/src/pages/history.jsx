import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import EventIcon from "@mui/icons-material/Event";
import CircularProgress from "@mui/material/CircularProgress";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
          Meeting History
        </Typography>
        <IconButton
          onClick={() => routeTo("/home")}
          size="large"
          sx={{
            backgroundColor: "primary.light",
            "&:hover": { backgroundColor: "primary.main" },
          }}
        >
          <HomeIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : meetings.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            p: 4,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No meeting history available
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {meetings.map((e, i) => (
            <Card
              key={i}
              variant="outlined"
              sx={{
                borderRadius: 2,
                boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    mr: 2,
                    width: 40,
                    height: 40,
                  }}
                >
                  <MeetingRoomIcon fontSize="small" />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "medium" }}
                  >
                    Meeting Code: {e.meetingCode}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 0.5,
                    }}
                  >
                    <EventIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                        fontSize: "1rem",
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(e.date)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
