import React, { useEffect, useState } from "react";
import "../styles/LeaveRequest.css";
import { TextField, CircularProgress } from "@mui/material";
import { UserInformationCard } from "./UserInformationCard";
import { applyLeave } from "../services/LeaveService";
import { LeaveHistory } from "./LeaveHistory";

export const LeaveRequest = () => {
  const user = JSON.parse(localStorage.getItem("userDetails")); 
  const [selectedService, setSelectedService] = useState(1);
  const [requestLoading, setRequestLoading] = useState(false);
  const [selectedType,setSelectedType] = useState("");

  const entities = [
    { id: 1, name: "SAHAM Management Company" },
    { id: 2, name: "SAHAM Immobilier" },
    { id: 3, name: "Medjool Star" },
  ];

  const leaveTypes = [
    { id: 1, name: "Annuel" },
    { id: 2, name: "Exceptionnel", subTypes: [
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

  const RequestForm = ({user}) => {

    const [requestDto, setRequestDto] = useState({
      startDate: "",
      endDate: "",
      type: "",
      comment: "",
    });

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [totalDays, setTotalDays] = useState(0);

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
        setRequestLoading(true);
        const response = await applyLeave(email, requestDto);
        console.log(response);
        alert("Demande envoyée avec succès !");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la soumission de la demande !");
      } finally {
        setRequestLoading(false);
        console.log(requestDto);
      }
    };

    useEffect(() => {
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        setRequestDto((prev) => ({
          ...prev,
          startDate: dateFormatter(fromDate),
          endDate: dateFormatter(toDate),
        }));
        const diffTime = toDate - fromDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(diffDays > 0 ? diffDays : 0);
      }
    }, [from, to]);

    return (
      <div style={{ padding: 20, position: "relative" }}>
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
          style={{ opacity: requestLoading ? 0.5 : 1, pointerEvents: requestLoading ? "none" : "auto" }}
        >
          <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
            <TextField
              label="Date de début"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              onChange={(e) => setFrom(e.target.value)}
            />
            <TextField
              label="Date de fin"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
            <div className="col-xl-6">
              <select className="styled-select" style={{
                fontSize : "12px"
              }}>
                <option style={{
                  fontSize : "10px"
                }}>-- Sélectionnez une entité --</option>
                {entities.map((e) => (
                  <option key={e.id}>{e.name}</option>
                ))}
              </select>
            </div>

            <div className="col d-flex" style={{ alignItems: "center" }}>
              <p>
                Nombre des jours : <b>{totalDays}</b>
              </p>
            </div>
          </div>

          <div style={{ margin: "15px 0" }}>
            <p style={{ marginBottom: 10, fontWeight: 500 }}>
              Sélectionnez le type de congé :
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {leaveTypes.map((leave) => (
                <label
                  key={leave.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                  }}
                >
                  <input
                    type="radio"
                    name="type"
                    value={leave.name}
                    onChange={()=> 
                      setSelectedType(leave.name)
                    }
                  />
                  {leave.name}
                  {leave.subTypes && selectedType === "Exceptionnel" &&
                   <div className="row ms-3">
                    <select className="styled-select" style={{
                      fontSize : "12px"
                    }} value={requestDto.type} name="type" onChange={(e)=> handleChange(e)}>
                      <option>-- Sélectionnez un type de congé --</option>
                      {leave.subTypes.map((sub)=>(
                        <option>
                          {sub.name}
                      </option>
                   ))}
                   </select>
                  </div>}
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
    { id: 1, name: "Profil", view: <UserInformationCard/> },
    { id: 2, name: "Nouvelle Demande", view: <RequestForm user={user}/> },
    { id: 3, name: "Historique des demandes", view: <LeaveHistory user={user}/> },
  ];

  return (
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
        {selectedService === 1 ? <></>: <UserInformationCard />}
      </div>
      

      <div className="row">
        {services.map((s) => (s.id === selectedService ? s.view : ""))}
      </div>
    </div>
  );
};
