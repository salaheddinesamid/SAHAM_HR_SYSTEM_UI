import { useState } from "react";
import { UserInformationCard } from "./UserInformationCard";

export const DocumentRequest = ()=>{

    const [selectedService, setSelectedService] = useState(1);
    const [requestLoading, setRequestLoading] = useState(false);
    const [selectedType,setSelectedType] = useState("");

    const entities = [
        { id: 1, name: "SAHAM Management Company" },
        { id: 2, name: "SAHAM Immobilier" },
        { id: 3, name: "Medjool Star" },
    ];


    const documentTypes = [
        {id: 1, name: "Attestation de travail"},
        {id: 2, name: "Attestation de salaire"},
        {id: 3, name: "Attestation de domiciliation de salaire "},
        {id: 4, name: "Les trois derniers bulletins de paie"},
        {id: 5, name: "", component: <input type="text" placeholder="Autre"/>}
    ]

    const RequestForm = ()=>{

        return(
            <div>
                <div className="row mt-4">
                    
                    <div className="col">
                        <p><b>Sélectionnez le type de document : </b></p>
                        {
                            documentTypes.map((type)=>(
                                <label className="d-flex">
                                    <input type="checkbox" name="" id="" />
                                    {type.name} 
                                    {type.component && type.component}
                                </label>
                            ))
                        }
                    </div>
                    <div className="col">
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

                    
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <button className="submit-btn">
                        Soumettre
                    </button>
                    </div>
                </div>
            </div>
        )
    }

    const services = [
        {id: 1, name: "Profil", view: <UserInformationCard exception={"Without solde"}/>},
        {id: 2, name: "Nouvelle Demande", view: <RequestForm/>},
        {id: 3, name: "Historique des demandes", view:<></>}
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
                {selectedService === 1 ? <></>: <UserInformationCard exception={"Without solde"}/>}
              </div>
              
        
              <div className="row">
                {services.map((s) => (s.id === selectedService ? s.view : ""))}
              </div>
        </div>
    )
}