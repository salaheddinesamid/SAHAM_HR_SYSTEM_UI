import React, { useState } from "react";
import back from "../0002.jpg";
import "../styles/Login.css";
import logo from "../logo.png";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

export const Login = () => {


  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();


  const handleLogin = ()=>{
    navigate("/dashboard")
  }

  const LoginForm = () => (
    <div className="login-form-overlay">
      <div className="login-container shadow">
        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">Accédez à votre espace employé</p>

        <input
          type="text"
          placeholder="Adresse e-mail ou identifiant"
          className="form-control mt-3 mb-3"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="form-control mt-3 mb-3"
          required
        />

        <button className="login-btn mt-4" onClick={handleLogin}>Se connecter</button>

        <p className="login-footer mt-3">
          Mot de passe oublié ? <a href="#">Réinitialiser</a>
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="login-full"
      style={{
        backgroundImage: `url(${back})`,
      }}
    >
      <div className="overlay">
        <div className="top-bar">
            <div>
                <img src={logo} alt="logo" className="top-logo" />
            </div>
          <button
            className="login-btn top-right-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <LoginIcon/>
          </button>
        </div>
        {/*<img src={logo} alt="logo" className="" />*/}
        <h1 className="welcome-text">Bienvenue chez SAHAM HR System</h1>
      </div>

      {showForm && <LoginForm />}
    </div>
  );
};
