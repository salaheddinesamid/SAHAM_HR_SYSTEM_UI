import React, { useState } from "react";
import "../styles/Dashboard.css";
import logo from "../logo.png";
import { FaChevronDown, FaChevronUp, FaHome, FaCalendarAlt } from "react-icons/fa";

import BasicPie from "../components/charts/PieChart";
import { LeaveRequest } from "../components/Leave";
import { UserProfile } from "../components/UserProfile";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Home } from "../components/Home";

export const Dashboard = () => {

  // Available services:
  const services = [
    { id: 1, name: "Acceuil", icon: <FaHome />, view: <Home/> },
    {
      id: 2,
      name: "Demande administratif",
      icon: <FaCalendarAlt />,
      view: <></>,
      subServices: [
        { id: 1, name: "Demande de conge", view: <LeaveRequest /> },
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

          <div className="header-right d-flex">
            <div className="notification">
              <NotificationsIcon />
            </div>
            <div>
              <UserProfile />
            </div>
          </div>
        </div>
        <div className="right-side-content">
          {selectedService.view}
        </div>
      </div>
    </div>
  );
};