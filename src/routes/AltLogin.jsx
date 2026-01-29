import React, { useState } from "react";
import back from "../0002.jpg";
import "../styles/Login.css";
import logo from "../logo.png";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/AuthService";
import Cookies from "js-cookie";
import {
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

export const AltLogin = () => {
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const postAuthentication = (token, userDetails) => {
    const accessToken = token?.accessToken;

    Cookies.set("accessToken", accessToken, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    setTimeout(() => navigate("/"), 1200);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setLoginError("");

      const res = await authenticate(loginDetails);

      const bearerToken = res?.data?.bearerToken;
      const userDetails = res?.data?.userDetails;

      setLoginSuccessMessage("Connexion réussie, redirection...");

      if (res) postAuthentication(bearerToken, userDetails);
    } catch (err) {
      setLoginError(
        err?.message || "Identifiants incorrects"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-full"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="overlay">
        <div className="top-bar">
          <img src={logo} alt="logo" className="top-logo" />
          <button
            className="login-btn top-right-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <LoginIcon />
            &nbsp; Connexion
          </button>
        </div>

        <div className="hero-content">
          <h1>Bienvenue sur My HR SAHAM</h1>
          <p>Plateforme de gestion des ressources humaines</p>
        </div>
      </div>

      {showForm && (
        <div className="login-form-overlay">
          <div className="login-container">
            <div className="login-header">
              <img src={logo} alt="logo" />
              <h2>Connexion</h2>
              <p>Accédez à votre espace professionnel</p>
            </div>

            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}

            {loginSuccessMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {loginSuccessMessage}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Adresse e-mail"
              name="email"
              value={loginDetails.email}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Mot de passe"
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginDetails.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <button
              className="login-btn crm-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Se connecter"
              )}
            </button>

            <div className="login-footer">
              <a href="#">Mot de passe oublié ?</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
