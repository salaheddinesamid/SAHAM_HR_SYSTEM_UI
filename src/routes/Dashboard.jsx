import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import logo from "../logo.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { UserProfile } from "../components/UserProfile";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { servicesConfig } from "../components/servicesConfig";
import { useService } from "../context/ViewNavigatorContext";

export const Dashboard = () => {
  const [openServices, setOpenServices] = useState([]);
  const { selectedService, selectService } = useService();

  const toggleService = (name) => {
    if (openServices.includes(name)) {
      setOpenServices(openServices.filter(n => n !== name));
    } else {
      setOpenServices([...openServices, name]);
    }
  };


  useEffect(()=>{
    toggleService(selectService.name);
  },[selectedService])

  return (
    <div className="dashboard">
      <div className="left-side">
        <div className="left-side-header">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="left-side-services">
          {servicesConfig.map((s) => (
            <div key={s.id} className="service-item">
              <button
                className="service-btn"
                onClick={() => {
                  if (s.subServices) toggleService(s);
                  else selectService(s);
                }}
              >
                {s.name}
                {s.subServices && (
                  <span className="chevron">
                    {s.subServices?.some(sub => sub.name === selectedService.name) ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                )}
              </button>
              
              {s.subServices?.some(sub => sub.name === selectedService.name) && (
                <div className="sub-services">
                  {s.subServices.map((sub) => (
                    <button
                    key={sub.name}
                    className={`sub-service-btn ${selectedService.name === sub.name ? "active" : ""}`}
                    onClick={() => {
                      selectService(sub);
                      // Close the parent menu
                      setOpenServices(prev => prev.filter(pName => pName !== s.name));
                    }}
                    >
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
            <p className="page-title">{selectedService.name !== "Home" ? selectedService.name : ""}</p>
          </div>
          <div className="header-right d-flex">
            <div className="notification">
              <NotificationsIcon />
            </div>
            <UserProfile />
          </div>
        </div>
        <div className="right-side-content">
          {selectedService.view}
        </div>
      </div>
    </div>
  );
};
