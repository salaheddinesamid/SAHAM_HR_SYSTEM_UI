import React, { lazy, Suspense, useEffect, useState } from "react";
import { TextField, CircularProgress, Alert, Snackbar } from "@mui/material";
import { applyLeave } from "../services/LeaveService";

/*
const SubordinatesLeaveRequestsHistory = lazy(() => import("./SubordinatesLeaveRequestsHistory"));
const UserInformationCard = lazy(() => import("./UserInformationCard"));
const LeaveHistory = lazy(() => import("./LeaveHistory"));
const PendingLeaveRequests = lazy(() => import("./PendingLeaveRequests"));
const MyTeam = lazy(() => import("./MyTeam"));
*/

import { UserInformationCard } from "./UserInformationCard";
import { LeaveHistory } from "./LeaveHistory";
import { SubordinatesLeaveRequestsHistory } from "./SubordinatesLeaveRequestsHistory";
import { PendingLeaveRequests } from "./PendingLeaveRequests";
import { MyTeam } from "./MyTeam";
import "../styles/LeaveRequest.css"
import { CheckIcon, TriangleAlert } from "lucide-react";

export const LeaveRequest = () => {
  const user = JSON.parse(localStorage.getItem("userDetails")); 
  const userRoles = user?.roles || [];
  const [selectedService, setSelectedService] = useState(1);
  const [error,setError] = useState("");
  const [submitSuccess,setSubmitSuccess] = useState(false);

  const leaveTypes = [
    { id: 1, name: "Annuel", value : "ANNUAL"},
    { id: 2, name: "Exceptionnel", value : "EXCEPTIONAL" ,subTypes: [
      {id: 1, name: "Mariage du salarié "},
      {id: 2, name: "Mariage d’un enfant du salarié "},
      {id: 3, name: "Naissance "},
      {id: 4, name: "Circoncision de l’enfant "},
      {id: 5, name: "Déménagement "},
      {id: 6, name: "Opération chirurgicale grave du conjoint ou d’un enfant "},
      {id: 7, name: "Décès du conjoint, d’un descendant ou d’un ascendant du salarié"},
      {id: 8, name: "Décès d’un ascendant du conjoint, frère ou sœur du salarié ou de son conjoint"}
    ]}
  ];
  
  const RequestForm = ({ user }) => {
  const [requestDto, setRequestDto] = useState({
    startDate: "",
    endDate: "",
    type: "",
    typeDetails : "",
    comment: "",
  });

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState("");

  const entities = [
    { id: 1, name: "SAHAM Horizon" },
    { id: 2, name: "SAHAM Finances" },
    { id: 3, name: "SAHAM Foundation" },
  ];

  const dateFormatter = (date) => new Date(date).toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestDto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const email = user?.email;
    try {
      //setRequestLoading(true);
      const payload = {
        ...requestDto,
        entity: selectedEntity,
        totalDays,
      };
      console.log(requestDto);
      // Send the request to the server:
      await applyLeave(email, payload);
      // if success, display a snackbar:
      setSubmitSuccess(true);
      // init the request dto:
      setRequestDto({
        startDate: "",
        endDate: "",
        type: "",
        comment: "",
      })

      console.log("Submitting request:", payload);
      //alert("Demande envoyée avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la soumission de la demande !");
    } finally {
      setRequestLoading(false);
    }
  };

  // Update start/end and total days
  useEffect(() => {
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const diffDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(diffDays > 0 ? diffDays : 0);

      setRequestDto((prev) => ({
        ...prev,
        startDate: dateFormatter(fromDate),
        endDate: dateFormatter(toDate),
      }));
    }
  }, [from, to]);

  return (
    <div style={{ padding: 20, position: "relative" }}>
      <Snackbar
        open={submitSuccess}
        autoHideDuration={4000}
        onClose={() => setSubmitSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          icon={<CheckIcon fontSize="inherit" />}
          sx={{ width: '100%' }}
        >
          Votre demande a été enregistrer avec success
        </Alert>
      </Snackbar>
      <Snackbar
        open={error !== ""}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="error" 
          icon={<TriangleAlert fontSize="inherit"/>}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      {requestLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <CircularProgress size={60} color="primary" />
        </div>
      )}

      <div
        className="request-form"
        style={{
          opacity: requestLoading ? 0.5 : 1,
          pointerEvents: requestLoading ? "none" : "auto",
        }}
      >

        <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <TextField
          label="Date de début"
          type="date"
          helperText="Ce champ est obligatoire"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={(e) => setFrom(e.target.value)}
          FormHelperTextProps={{
            sx: { color: 'red' } // make helper text red
          }}
          />
          <TextField
          label="Date de fin"
          type="date"
          helperText="Ce champ est obligatoire"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={(e) => setTo(e.target.value)}
          FormHelperTextProps={{
            sx: { color: 'red' } // make helper text red
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <div className="col-xl-6">
            <select
              className="styled-select"
              style={{ fontSize: "12px" }}
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
            >
              <option value="">-- Sélectionnez une entité --</option>
              {entities.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col d-flex align-items-center">
            <p>
              Nombre de jours : <b>{totalDays}</b>
            </p>
          </div>
        </div>
        <div style={{ margin: "15px 0" }}>
          <p style={{ marginBottom: 10, fontWeight: 500 }}>Sélectionnez le type de congé :</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {leaveTypes.map((leave) => (
              <label key={leave.id} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                <input
                  type="radio"
                  name="type"
                  value={leave.value}
                  checked={selectedType === leave.name}
                  onChange={() => {
                    setSelectedType(leave.name);
                    setRequestDto((prev) => ({
                      ...prev,
                      type: leave.value,
                    }));
                  }}
                />
                {leave.name}
                {leave.subTypes && selectedType === leave.name && (
                  <div className="row ms-3">
                    <select
                      className="styled-select"
                      style={{ fontSize: "12px" }}
                      name="typeDetails"
                      value={requestDto.typeDetails}
                      onChange={handleChange}
                    >
                      <option value="">-- Sélectionnez un type de congé --</option>
                      {leave.subTypes.map((sub, i) => (
                        <option key={i} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <TextField
          name="comment"
          label="Commentaire (optionnel)"
          multiline
          rows={3}
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <button className="submit-btn" onClick={handleSubmit} disabled={requestLoading}>
          Soumettre
        </button>
      </div>
    </div>
  );
};
  const services = [
    { id: 1, name: "Profil", view: <Suspense fallback={<CircularProgress/>}>
      <UserInformationCard/>
      </Suspense> },
    { id: 2, name: "Nouvelle Demande", view: <RequestForm user={user}/> , allowedRoles:["EMPLOYEE","MANAGER","HR"]},
    { id: 3, name: "Historique des demandes", view: <Suspense fallback={<CircularProgress/>}>
      <LeaveHistory user={user}/>
    </Suspense> , allowedRoles:["EMPLOYEE","MANAGER","HR"]},
    { id: 4, name: "Les demandes de vos subordonnés", view: <SubordinatesLeaveRequestsHistory manager={user}/> , allowedRoles:["MANAGER"]},
    { id: 5, name: "Les demandes en attente", view: <Suspense fallback={<CircularProgress/>}>
      <PendingLeaveRequests/>
    </Suspense>, allowedRoles:["HR"]},
    { id: 6, name: "Mes Equipes", view: <Suspense fallback={<CircularProgress/>}>
      <MyTeam/>
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
        {selectedService === 4 || selectedService === 1 || selectedService === 5 || selectedService === 6 ? <></>: <UserInformationCard />}
      </div>
      

      <div className="row">
        {services.find((s) => s.id === selectedService)?.view}
      </div>
    </div>
  );
};
