import { useState } from "react";
import { UserInformationCard } from "./UserInformationCard"
import { TextField } from "@mui/material";


export const Loan = ()=>{
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [selectedService, setSelectedService] = useState(1);

    // handle submit both requests (Pret/Avance)
    const handleSubmitRequest = (request)=>{
        try{
            console.log(request);
        }catch(err){

        }finally{

        }
    }

    // This form handles (Pret-interne) loan requests
    const PretInternForm = ()=>{
        const [requestDto,setRequestDto] = useState({
            type : "",
            matriculation : user?.matriculation,
            poste : user?.occupation,
            entity : user?.entity,
            motif : "",
            paymentModel : "",
            
        })

        const handleChange = (e)=>{
            const {name,value} = e.target;
            setRequestDto((prev)=>({
                ...prev,
                [name] : value
            }))
        }

        const types = [
            {id: 1, name: "Prêt sans intérêt (société)"},
            {id: 2, name: "Prêt au Logement"}
        ]
        return(
            <div className="row">
                <h4>Demande de Prêt</h4>
                <div className="row">
                    <p style={{fontSize : "10px"}}>Selectionnez le type de Prêt :</p>
                    {
                        types.map((t)=>(
                            <label>
                                <input type="radio" name="type" value={requestDto.type} onChange={handleChange}/>
                                {t.name}
                            </label>
                        ))
                    }
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
                    <div className="col-xl-4">
                        <button className="submit-btn" onClick={()=>handleSubmitRequest(requestDto)}>Soumettre</button>
                    </div>
                </div>
            </div>
        )
    }

    // This form handles (Avance) loan requests
    const AvanceForm = ()=>{
        const [requestDto,setRequestDto] = useState({
            type : "",
            matriculation : user?.matriculation,
            poste : user?.occupation,
            entity : user?.entity,
            motif : "",
            paymentModel : "",
            
        });

        const handleChange = (e)=>{
            const {name, value} = e.target;
            setRequestDto((prev)=>({
                ...prev,
                [name] : value
            }))
        }

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
                                <input type="radio" value={requestDto.type} name="type" onChange={handleChange}/>
                                {t.name}
                            </label>
                        ))
                    }
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
                    <div className="col-xl-4">
                        <button className="submit-btn" onClick={()=>handleSubmitRequest(requestDto)}>Soumettre</button>
                    </div>
                </div>
            </div>
        )
    }

    // This component is responsible for rendering new loan request forms.
    const NewRequest = ()=>{
        const [selectedType,setSelectedType] = useState(1);
        const types = [{id: 1, name: "Prêt Interne", view: <PretInternForm/>},{id: 2, name: "Avance", view: <AvanceForm/>}]
        return(
            <div className="row mt-4">
                <div className="row">
                    {
                    types.map((type)=>(
                        <div className="col">
                            <label htmlFor="" >
                            <input type="radio" value={selectedType} 
                            name="documentType" onChange={()=> setSelectedType(type.id)} checked={type.id === selectedType}/>
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

    // This array contains services provided and rendered by Loan service
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