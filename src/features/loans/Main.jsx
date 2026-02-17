import { useState } from "react";
import { LoanHistory } from "./components/LoanHistory";
import { EmployeeLoanRequests } from "./components/EmployeeLoanRequestHistory";
import { LoanRequest } from "./components/LoanRequest";


export const Loan = ()=>{
    
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const userRoles = user?.roles;
    const [selectedService, setSelectedService] = useState(1);
    // This array contains services provided and rendered by Loan service
    const services = [
        {id: 1, name: "Nouvelle Demande", view: <LoanRequest/>, allowedRoles : ["EMPLOYEE", "HR", "MANAGER"]},
        {id: 2, name: "Statut des demandes", view:<LoanHistory user={user}/>, allowedRoles : ["EMPLOYEE", "MANAGER", "HR"]},
        {id: 3, name: "Les demandes en attente", view:<EmployeeLoanRequests/>, allowedRoles : ["HR"]}
    ]
    const filteredServices = services.filter((service)=>
        !service.allowedRoles || service.allowedRoles.some(role => userRoles.includes(role)));
    return(
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: "10px", margin: "0px 0px" }}>
                {filteredServices.map((service) => (
                    <p
                    key={service.id}
                    style={{
                      cursor: "pointer",
                      borderBottom: service.id === selectedService ? "2px solid #004170" : "",
                    }}
                    onClick={() => setSelectedService(service.id)}
                  >
                    {service.name}
                  </p>
                ))}
            </div>
            <div className="row">
                {filteredServices.map((s) => (s.id === selectedService ? s.view : ""))}
            </div>
        </div>
    )
}