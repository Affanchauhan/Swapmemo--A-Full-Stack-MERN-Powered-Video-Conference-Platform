import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { Box } from "@mui/material";

export default function LandingPage() {
  const router = useNavigate();
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageRef.current) {
        imageRef.current.classList.toggle("pulse-effect");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      <nav className="app-nav">
        <div className="nav-content">
          <h2 className="logo">
            <span className="logo-accent">Swap</span>memo
          </h2>
          <div className="nav-links">
            <button className="nav-link" onClick={() => router("/aljk23")}>
              Join as Guest
            </button>
            <button className="nav-link" onClick={() => router("/auth")}>
              Register
            </button>
            <button
              className="nav-link primary-btn"
              onClick={() => router("/auth")}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Professional <span className="text-accent">Video Conferencing</span>
          </h1>
          <p className="hero-subtitle">
            Crystal clear communication for teams and individuals
          </p>
          <div className="cta-container">
            <Link to="/auth" className="cta-button">
              Get Started
              <svg className="arrow-icon" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3>Voice Clarity</h3>
              <p>Advanced noise cancellation</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <h3>HD Video</h3>
              <p>Up to 4K resolution</p>
            </div>
          </div>
        </div>

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
              maxWidth: "95%",
              height: "auto",
              filter: "drop-shadow(0 20px 30px rgb(242, 248, 254))",
            }}
          />
        </Box>
      </div>
    </div>
  );
}
