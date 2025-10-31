import React from "react";
import BasicPie from "./charts/PieChart";
import "../styles/Home.css";
import { Briefcase, HeartPulse, FileText, Gift, Activity, Wallet } from "lucide-react"; // optional icons

export const Home = () => {
  const services = [
    { id: 1, name: "Demandes de congé", icon: <FileText /> },
    { id: 2, name: "Demandes de prêt", icon: <Wallet /> },
    { id: 3, name: "Demandes d’avance", icon: <Briefcase /> },
    { id: 4, name: "Les bons plans Saham", icon: <Gift /> },
    { id: 5, name: "Informations médicales et d'urgence", icon: <HeartPulse /> },
    { id: 6, name: "Mes remboursements médicaux", icon: <Activity /> },
    { id: 7, name: "Mes dépenses", icon: <Wallet /> },
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Bienvenue dans votre espace collaborateur</h2>
      </div>

      <div className="home-content">
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.id} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <p className="service-name">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
