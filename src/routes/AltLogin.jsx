import React, { useState } from "react";
import back from "../0002.jpg";
import "../styles/Login.css";
import logo from "../logo.png";
import bgLogo from "../logo_bg.png"
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
import { LockKeyhole } from "lucide-react";

export const AltLogin = () => {
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);
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
      secure: false,
      sameSite: "Lax",
    });

    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    setTimeout(() => navigate("/"), 1200);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await authenticate(loginDetails);

      const bearerToken = res?.data?.bearerToken;
      const userDetails = res?.data?.userDetails;
      setLoginError(null)
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
      <div className="row" style={{width : "100%", padding : 30}}>
        <div className="col-xl-8" style={{padding : 30}}>
          <div className="mb-4">
            <img src={logo} alt="logo" className="top-logo" />
          </div>
          <div style={{paddingTop : 20, paddingLeft : 10 ,color :"white"}}>
            <h1><b>Bienvenue sur My HR SAHAM</b></h1>
            <p>Plateforme de gestion des ressources humaines</p>
          </div>
        </div>
        <div className="col-xl-4" style={{padding : 30}}>
          <div className="login-container">
            <div className="login-header">
              <img src={bgLogo} alt="logo" style={{height : "80px", marginBottom : "30px"}}/>
              <h2>Connexion</h2>
              <p>Accédez à votre espace professionnel</p>
            </div>

            {loginError !== null && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}

            {loginSuccessMessage !== null && (
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
              className="login-btn"
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
              <a href="forgot-password">Mot de passe oublié ?</a>
            </div>
            <div className="secured-connection mt-4">
              <p><b><LockKeyhole /> Connexion sécurisée</b></p>
              <p>Vos données sont protégées</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
