import { useState } from "react";

export const PersonalDetails = () => {
    // Get the user details from the local storage
    const user = JSON.parse(localStorage.getItem("userDetails"));
    
    const handleChange = (e) => {
        //setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving personal details");
    };
    
    return (
    <>
      <h2>Informations personnelles</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Prénom</label>
          <input name="firstName" value={user?.firstName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Nom</label>
          <input name="lastName" value={user?.lastName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email professionnel</label>
          <input name="email" disabled value={user?.email} />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input name="phone" value={user?.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Poste</label>
          <input name="position" disabled value={user?.occupation} />
        </div>

        <button className="primary-btn">Enregistrer</button>
      </form>
    </>
  );
};
