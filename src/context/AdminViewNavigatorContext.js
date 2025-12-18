// ServiceContext.jsx
import { createContext, useContext, useState } from "react";
import { Home } from "../components/Home";
import { EmployeeManagementTable } from "../features/admin/components/EmployeeManagementTable";

const ServiceContext = createContext();

export const useAdminService = () => useContext(ServiceContext);

export const AdminServiceProvider = ({ children }) => {
  // Set default service here
  const [selectedService, setSelectedService] = useState(
    {id : 1, name : "Gestion des collaborateurs", view: <EmployeeManagementTable/>}
);

  const selectService = (service) => {
    setSelectedService(service);
  };

  return (
    <ServiceContext.Provider value={{ selectedService, selectService }}>
      {children}
    </ServiceContext.Provider>
  );
};
