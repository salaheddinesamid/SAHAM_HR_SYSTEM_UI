import React from "react";
import { homeCards } from "./servicesConfig";
import "../styles/Home.css";
import { useService } from "../context/ViewNavigatorContext";

export const Home = ({ onCardClick }) => {

    const {service, selectService} = useService();
  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Bienvenue dans votre espace collaborateur</h2>
      </div>

      <div className="home-content">
        <div className="services-grid">
          {homeCards.map((s) => (
            <div key={s.id} className="service-card" onClick={() => selectService(s)}>
              <div className="service-icon">{s.icon}</div>
              <p className="service-name">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
