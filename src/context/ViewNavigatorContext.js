// ServiceContext.jsx
import { createContext, useContext, useState } from "react";
import { Home } from "../components/Home";

const ServiceContext = createContext();

export const useService = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
  // Set default service here
  const [selectedService, setSelectedService] = useState({
    id: 1,
    name: "Home",
    view: <Home/> // you can store a component or identifier
  });

  const selectService = (service) => {
    setSelectedService(service);
  };

  return (
    <ServiceContext.Provider value={{ selectedService, selectService }}>
      {children}
    </ServiceContext.Provider>
  );
};
