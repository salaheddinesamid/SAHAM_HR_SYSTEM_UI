import { useState } from "react";
import "./../styles/ForgotPassword.css";
import background from "./../0002.jpg";
import logo from "./../logo.png";
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your corporate email.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call your Spring Boot API here
      await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Always show generic message (security best practice)
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="fp-card">
        <div className="fp-header">
          <img src="https://saham.com/app/uploads/2025/05/cropped-favicon-32x32.png" style={{height : "100px"}}/>
          <p>Récupération de mot de passe</p>
        </div>

        {submitted ? (
          <div className="fp-success">
            <p>
              Si un compte associé à cette adresse e-mail existe, un lien de réinitialisation du mot de passe a été
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="fp-input-group">
              <label>Courriel d'entreprise</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && <p className="fp-error">{error}</p>}

            <button type="submit" className="fp-button" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer le lien de réinitialisation"}
            </button>

            <div className="fp-footer">
              <a href="/login">Retour à la connexion</a>
            </div>
          </form>
        )}

        <p className="fp-security-note">
          Pour des raisons de sécurité, les liens de réinitialisation expirent après 15 minutes.
        </p>
      </div>
    </div>
  );
};