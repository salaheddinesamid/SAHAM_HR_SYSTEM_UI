import React, { useState } from "react";
import back from "../0002.jpg";
import "../styles/Login.css";
import logo from "../logo.png";

export const AltLogin = () => {
  const [showForm, setShowForm] = useState(false);

  const LoginForm = () => (
    <div className="login-form-right">
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

  return (
    <div
      className="login-full"
      style={{
        backgroundImage: `url(${back})`,
      }}
    >
      <div className="overlay">
        <img src={logo} alt="logo" style={{ marginBottom: "20px" }} />
        <h1 className="welcome-text">Bienvenue chez SAHAM</h1>

        {!showForm && (
          <button
            className="login-btn"
            style={{ width: "200px", marginTop: "30px" }}
            onClick={() => setShowForm(true)}
          >
            Connexion
          </button>
        )}
      </div>

      {showForm && <LoginForm />}
    </div>
  );
};
