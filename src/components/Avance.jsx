import { useState } from "react";
import { UserInformationCard } from "./UserInformationCard"
import { TextField } from "@mui/material";


export const Avance = ()=>{

    const [selectedService, setSelectedService] = useState(2);

    const PretInternForm = ()=>{
        const [selectedType,setSelectedType] = useState("");
        const [requestDto,setRequestDto] = useState({
            type : "",
            matriculation : "",
            poste : "",
            entity : "",
            motif : "",
            paymentModel : "",
            
        })

        const types = [
            {id: 1, name: "Prêt sans intérêt (société)"},
            {id: 2, name: "Prêt au Logement"}
        ]
        return(
            <div className="row">
                <h4>Demande de Pret</h4>
                <div className="row">
                    <p>Selectionnez le type de pret:</p>
                    {
                        types.map((t)=>(
                            <label>
                                <input type="radio"/>
                                {t.name}
                            </label>
                        ))
                    }
                </div>
            </div>
        )
    }

    const AvanceForm = ()=>{
        const [selectedType,setSelectedType] = useState("");
        const [requestDto,setRequestDto] = useState({
            type : "",
            matriculation : "",
            poste : "",
            entity : "",
            motif : "",
            paymentModel : "",
            
        })

        const types = [
            {id: 1, name: "Avance sur salaire"},
            {id: 2, name: "Autre avances"}
        ]
        return(
            <div className="row">
                <h4>Demande d'avance</h4>
                <div className="row">
                    <p style={{fontSize : "10px"}}>Selectionnez le type d'avance :</p>
                    {
                        types.map((t)=>(
                            <label>
                                <input type="radio"/>
                                {t.name}
                            </label>
                        ))
                    }
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <TextField
                            label="Matriculation"
                            type="text"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            placeholder="Matriculation N°"/>
                    </div>
                    <div className="col">
                        <TextField
                            label="Entité"
                            type="text"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            placeholder="Entité"/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <TextField
                            label="Poste"
                            type="text"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            placeholder="Poste"/>
                    </div>
                    <div className="col">
                        <TextField
                            label="Montant"
                            type="number"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            placeholder="Montant"/>
                    </div>
                    
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <TextField
                            label="Montant"
                            type="number"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            placeholder="Montant"/>
                    </div>
                    <div className="col">
                        <TextField
                            label="Modalités de remboursement "
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            placeholder="Montant"/>
                        
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <label for="exampleFormControlTextarea1" class="form-label">Motif</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="col">

                    </div>
                </div>
                <div className="row mt-3">
                    <button className="submit-btn">Soumettre</button>
                </div>
            </div>
        )
    }

    const NewRequest = ()=>{

        const [selectedType,setSelectedType] = useState(2);
        const types = [
            {id: 1, name: "Pret Interne", view: <PretInternForm/>},
            {id: 2, name: "Avance", view: <AvanceForm/>}
        ]
        return(
            <div className="row mt-4">
                <div className="row">
                    {
                    types.map((type)=>(
                        <div className="col">
                            <label htmlFor="" >
                            <input type="radio" value={selectedType} name="documentType" onChange={()=> setSelectedType(type.id)}/>
                            {type.name}
                        </label>
                        </div>
                    ))
                }
                </div>
                <div className="row mt-3">
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