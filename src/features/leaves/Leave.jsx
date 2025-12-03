import { Suspense, useState } from "react";
import {CircularProgress} from "@mui/material";

/*
const SubordinatesLeaveRequestsHistory = lazy(() => import("./SubordinatesLeaveRequestsHistory"));
const UserInformationCard = lazy(() => import("./UserInformationCard"));
const LeaveHistory = lazy(() => import("./LeaveHistory"));
const PendingLeaveRequests = lazy(() => import("./PendingLeaveRequests"));
const MyTeam = lazy(() => import("./MyTeam"));
*/

import { UserInformationCard } from "./UserInformationCard";
import { LeaveHistory } from "./LeaveHistory";
import { SubordinateRequestsHistory, SubordinatesLeaveRequestsHistory } from "./SubordinatesRequestsHistory";
import { PendingLeaveRequests } from "./PendingLeaveRequests";
import { MyTeam } from "./MyTeam";
import "./styles/LeaveRequest.css"
import { MyLeaves } from "./MyLeaves";
import { Request } from "./components/Request";
import { RequestHistoryForHR } from "./RequestHistoryForHR";

export const LeaveRequest = () => {
  const user = JSON.parse(localStorage.getItem("userDetails")); 
  const userRoles = user?.roles || [];
  const [selectedService, setSelectedService] = useState(1);
  const [error,setError] = useState("");
  const [submitSuccess,setSubmitSuccess] = useState(false);
  const services = [
    { id: 1, name: "Profil", view: <Suspense fallback={<CircularProgress/>}>
      <UserInformationCard email={user?.email}/>
      </Suspense> },
    { id: 2, name: "Nouvelle Demande", view: <Request user={user}/> , allowedRoles:["EMPLOYEE","MANAGER","HR"]},
    { id: 8, name: "Mes congés", view: <MyLeaves user={user}/> , allowedRoles:["EMPLOYEE","MANAGER","HR"]},
    { id: 3, name: "Historique des demandes", view: <Suspense fallback={<CircularProgress/>}>
      <LeaveHistory user={user}/>
    </Suspense> , allowedRoles:["EMPLOYEE","MANAGER","HR"]},
    { id: 4, name: "Les demandes de mon équipe", view: <SubordinateRequestsHistory manager={user}/> , allowedRoles:["MANAGER"]},
    { id: 5, name: "Demandes des collaborateurs", view: <Suspense fallback={<CircularProgress/>}>
      <RequestHistoryForHR/>
    </Suspense>, allowedRoles:["HR"]},
    { id: 6, name: "Mes Equipes", view: <Suspense fallback={<CircularProgress/>}>
      <MyTeam manager={user}/>
    </Suspense>, allowedRoles:["MANAGER"]}
  ];

  const filteredServices = services.filter(service =>
    !service.allowedRoles || service.allowedRoles.some(role => userRoles.includes(role)));

  return (
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
      <div>
        {selectedService === 4 || selectedService === 1 || selectedService === 5 || selectedService === 6 ? <></>: <UserInformationCard email={user?.email}/>}
      </div>
      <div className="row">
        {services.find((s) => s.id === selectedService)?.view}
      </div>
    </div>
  );
};
