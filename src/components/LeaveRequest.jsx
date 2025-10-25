import React, { useState } from "react";
import "../styles/LeaveRequest.css";
import { TextField } from "@mui/material";

export const LeaveRequest = () => {
  const [selectedRequest, setSelectedRequest] = useState(1);

  const entities = [
    { id: 1, name: "SAHAM Management Company" },
    { id: 2, name: "SAHAM Immobilier" },
    { id: 3, name: "Medjool Star" },
  ];

  const requestTypes = [
    { id: 1, name: "Avance" },
    { id: 2, name: "Pre-interne" }
  ]

  const leaveTypes = [
    { id: 1, name: "Congé annuel" },
    { id: 2, name: "Congé maladie" },
    { id: 3, name: "Congé sans solde" },
    { id: 4, name: "Congé maternité / paternité" },
    { id: 5, name: "Autre" },
  ];

  const AdvanceRequest = () => {
    return (
      <div style={{ padding: 20 }}>
        <h3 style={{ marginBottom: 20, color: "#1E3A8A", fontWeight: 600 }}>
          Demande de congé
        </h3>
        <div style={{ display: "flex", gap: "20px", margin: "15px 0" }}>
            {requestTypes.map((type) => (
                <label
                key={type.id}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#f3f4f6",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e0e7ff")
                }
                
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
                >
                    <input
                    type="radio"
                    name="requestType"
                    value={type.id}
                    style={{
                        accentColor: "#1e3a8a",
                        width: "18px",
                        height: "18px",
                    }}
                    />
                    <span style={{ fontSize: "15px", color: "#1f2937" }}>{type.name}</span>
                </label>
            ))}
        </div>

        <div className="request-form">
          <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
            <input
              type="text"
              placeholder="Nom et Prénom"
              className="styled-input"
            />
            <input
              type="text"
              placeholder="Matricule N°"
              className="styled-input"
            />
          </div>
          <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
            <TextField
              label="Date de début"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              label="Date de fin"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
          <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
            <select className="styled-select">
              <option>-- Sélectionnez une entité --</option>
              {entities.map((e) => (
                <option key={e.id}>{e.name}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Remplaçant (si applicable)"
              className="styled-input"
            />
          </div>

          <div style={{ margin: "15px 0" }}>
            <p style={{ marginBottom: 10, fontWeight: 500 }}>
              Sélectionnez le type de congé :
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {leaveTypes.map((leave) => (
                <label
                  key={leave.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                  }}
                >
                  <input type="checkbox" />
                  {leave.name}
                </label>
              ))}
            </div>
          </div>

          <button className="submit-btn">Soumettre</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <AdvanceRequest />
    </div>
  );
};
