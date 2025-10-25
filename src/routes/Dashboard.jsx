import React, { useState } from "react";
import "../styles/Dashboard.css";
import logo from "../logo.png";
import { FaChevronDown, FaChevronUp, FaHome, FaCalendarAlt } from "react-icons/fa";
import { LeaveRequest } from "../components/LeaveRequest";
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const Dashboard = () => {

  // Available services:
  const services = [
    { id: 1, name: "Aperçu", icon: <FaHome />, view: <div>Aperçu Content</div> },
    {
      id: 2,
      name: "Demande de Congé",
      icon: <FaCalendarAlt />,
      view: <></>,
      subServices: [
        { id: 1, name: "Nouvelle demande", view: <LeaveRequest /> },
        { id: 2, name: "Historique", view: <div>Historique Content</div> },
      ],
    },
  ];

  const [openServices, setOpenServices] = useState([]);
  const [selectedService, setSelectedService] = useState(services[0]);

  const toggleService = (id) => {
    if (openServices.includes(id)) {
      setOpenServices(openServices.filter((sid) => sid !== id));
    } else {
      setOpenServices([...openServices, id]);
    }
  };

  const UserInformation = () => {
    return (
      <div className="user-info">
        <div className="notification">
          <NotificationsIcon />
        </div>
        <div className="user-avatar">
          <Avatar />
        </div>
        <div className="user-details">
          <p className="user-name">Salaheddine Samid</p>
          <p className="user-company">SAHAM</p>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="left-side">
        <div className="left-side-header">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="left-side-services">
          {services.map((s) => (
            <div key={s.id} className="service-item">
              <button
                className="service-btn"
                onClick={() => {
                  toggleService(s.id);
                  if (!s.subServices) setSelectedService(s);
                }}
              >
                {s.name}
                {s.subServices && (
                  <span className="chevron">
                    {openServices.includes(s.id) ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                )}
              </button>
              {s.subServices && openServices.includes(s.id) && (
                <div className="sub-services">
                  {s.subServices.map((sub) => (
                    <button key={sub.id} className="sub-service-btn" onClick={() => setSelectedService(sub)}>
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="right-side">
        <div className="right-side-header">
          <div className="header-left">
            <p className="page-title">{selectedService.name}</p>
          </div>

          <div className="header-right">
            <UserInformation />
          </div>
        </div>
        <div className="right-side-content">
          {selectedService.view}
        </div>
      </div>
    </div>
  );
};