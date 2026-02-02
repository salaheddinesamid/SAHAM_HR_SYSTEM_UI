import { useState } from "react";

export const SecurityDetails = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    console.log("Changing password", form);
  };

  return (
    <>
      <h2>Sécurité du compte</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mot de passe actuel</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button className="primary-btn">Changer le mot de passe</button>
      </form>
    </>
  );
};
