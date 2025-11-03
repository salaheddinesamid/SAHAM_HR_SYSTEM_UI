import { useState } from "react";
import { UserInformationCard } from "./UserInformationCard"


export const Avance = ()=>{

    const [selectedService, setSelectedService] = useState(1);

    const PretInternForm = ()=>{
        return(
            <div className="row">
                <p>Pret INTERNE</p>
            </div>
        )
    }

    const AvanceForm = ()=>{
        return(
            <div className="row">
                <p>Avance</p>
            </div>
        )
    }

    const NewRequest = ()=>{

        const [selectedType,setSelectedType] = useState(1);
        const types = [
            {id: 1, name: "Pret Interne", view: <PretInternForm/>},
            {id: 2, name: "Avance", view: <AvanceForm/>}
        ]
        return(
            <div className="row">
                <div className="row">
                    {
                    types.map((type)=>(
                        <label htmlFor="">
                            <input type="radio" value={selectedType} name="documentType" onChange={()=> setSelectedType(type.id)}/>
                            {type.name}
                        </label>
                    ))
                }
                </div>
                <div className="row">
                    {types.map((t) => (t.id === selectedType ? t.view : ""))}
                </div>
            </div>
        )
    }
    const services = [
        {id: 1, name: "Profil", view: <UserInformationCard exception={"Without solde"}/>},
        {id: 2, name: "Nouvelle Demande", view: <NewRequest/>},
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