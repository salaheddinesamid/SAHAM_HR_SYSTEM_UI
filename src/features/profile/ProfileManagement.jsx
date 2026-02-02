import { useState } from "react";
import { PersonalDetails } from "./components/PersonalDetails";
import { SecurityDetails } from "./components/SecurityDetails";
import { BalanceDetails } from "./components/BalanceDetails";
import "./styles/ProfileManagement.css";

const components = [
  { id: 1, name: "Informations personnelles", view: <PersonalDetails /> },
  { id: 2, name: "Sécurité", view: <SecurityDetails /> },
  { id: 3, name: "Solde de congé", view: <BalanceDetails /> }
];

export const ProfileManagement = () => {
    const [selectedComponent, setSelectedComponent] = useState(1);
    
    const activeComponent = components.find(
        (c) => c.id === selectedComponent
    );

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <h3 className="sidebar-title">Mon profil</h3>

        {components.map((c) => (
          <button
            key={c.id}
            className={`menu-item ${
              selectedComponent === c.id ? "active" : ""
            }`}
            onClick={() => setSelectedComponent(c.id)}
          >
            {c.name}
          </button>
        ))}
      </aside>
      <main className="profile-content">
        {activeComponent?.view}
      </main>
    </div>
  );
};
