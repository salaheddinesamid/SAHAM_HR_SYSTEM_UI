import React from "react";
import back from "../0002.jpg";
import "../styles/Login.css";
import logo from "../logo.png"

export const Login = () => {
  const LoginForm = () => {
    return (
      <div className="login-form">
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

          <button className="login-btn mt-4">Se connecter</button>

          <p className="login-footer mt-3">
            Mot de passe oublié ? <a href="#">Réinitialiser</a>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="login">
      <div
        className="login-left-side"
        style={{
          backgroundImage: `url(${back})`,
        }}
      >
        <div className="overlay">
          <img src={logo} style={{marginBottom:"20px"}}/>  
          <h1 className="welcome-text">Bienvenue chez SAHAM</h1>
        </div>
      </div>
      <div className="login-right-side">
        <LoginForm />
      </div>
    </div>
  );
};
