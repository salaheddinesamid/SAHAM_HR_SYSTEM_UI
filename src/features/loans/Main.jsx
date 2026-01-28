import { useState } from "react";
import { LoanHistory } from "./components/LoanHistory";
import { EmployeeLoanRequests } from "./components/EmployeeLoanRequestHistory";
import { UserInformationCard } from "../profile/UserInformationCard";
import { LoanRequest } from "./components/LoanRequest";


export const Loan = ()=>{
    
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [selectedService, setSelectedService] = useState(1);
    // This array contains services provided and rendered by Loan service
    const services = [
        {id: 1, name: "Profil", view: <UserInformationCard exception={"Without solde"} email={user?.email}/>},
        {id: 2, name: "Nouvelle Demande", view: <LoanRequest/>},
        {id: 3, name: "Statut des demandes", view:<LoanHistory user={user}/>},
        {id: 4, name: "Les demandes en attente", view:<EmployeeLoanRequests/>}
    ]
    return(
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: "10px", margin: "0px 0px" }}>
                {services.map((service) => (
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
            <div>
                {selectedService === 1 ? <></>: <UserInformationCard exception={"Without solde"} email={user?.email}/>}
            </div>
            <div className="row">
                {services.map((s) => (s.id === selectedService ? s.view : ""))}
            </div>
        </div>
    )
}