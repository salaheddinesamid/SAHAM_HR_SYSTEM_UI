import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./../styles/SetupPassword.css";
import background from "./../0002.jpg";
import { setupPassword } from "../services/AuthService";

export const SetupPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing activation token.");
    }
  }, [token]);

  const validatePassword = (pwd) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return strongRegex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Le mot de passe doit comporter au moins 8 caractères et inclure des majuscules, des minuscules, des chiffres et des caractères spéciaux.."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
        const response = await setupPassword();
        setSuccess(true);
        // Redirect after 3 seconds
        if(response === 200){
            setTimeout(() => navigate("/login"), 3000);
        }
    } catch (err) {
        setError("Activation failed. Token may be expired.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="sp-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="sp-card">
        <div className="sp-header">
          <img src="https://saham.com/app/uploads/2025/05/cropped-favicon-32x32.png" style={{height : "100px"}}/>
          <p>Configurez votre mot de passe</p>
        </div>

        {success ? (
          <div className="sp-success">
            <p>Votre compte a été activé avec succès.</p>
            <p>Redirection vers la page de connexion...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="sp-input-group">
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="sp-input-group">
              <label>Confirmez le mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="sp-error">{error}</p>}

            <button type="submit" className="sp-button" disabled={loading}>
              {loading ? "Activation..." : "Activer le compte"}
            </button>
          </form>
        )}

        <p className="sp-security-note">
          Pour des raisons de sécurité, les liens d'activation expirent après 24 heures.
        </p>
      </div>
    </div>
  );
};