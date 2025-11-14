import { useState } from "react";
import { UserInformationCard } from "./UserInformationCard";
import { requestDocument } from "../services/DocumentService";
import { DocumentRequestHistory } from "./DocumentRequestHistory";
import { EmployeeDocumentRequestHistory } from "./EmployeeDocumentRequests";

export const DocumentRequest = ()=>{
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [selectedService, setSelectedService] = useState(1);
    const [requestLoading, setRequestLoading] = useState(false);
    const [selectedType,setSelectedType] = useState("");

    const entities = [
        { id: 1, name: "SAHAM Horizon" },
        { id: 2, name: "SAHAM Finances" },
        { id: 3, name: "SAHAM Foundation" },
    ];


    const documentTypes = [
        {id: 1, name: "Attestation de travail"},
        {id: 2, name: "Attestation de salaire"},
        {id: 3, name: "Attestation de domiciliation de salaire "},
        {id: 4, name: "Les trois derniers bulletins de paie"},
        {id: 5, name: "", component: <input type="text" placeholder="Autre"/>}
    ]

    const RequestForm = ({user})=>{
        const [requestDto,setRequestDto] = useState({
            documents : [],
            entity : ""
        })
        const handleChange = (e)=>{
            const {name, value} = e.target;
            
            setRequestDto((prev)=>(
                {...prev, [name] : value}
            ))

        }
        const handleDocumentToggle = (document)=>{
             
            setRequestDto((prev)=>{
                const isSelected = prev.documents.includes(document);

                return{
                    ...prev,
                    documents : isSelected ? prev.documents.filter((doc)=> doc !== document) : 
                    [...prev.documents, document]
                }
            })
        }

        const handleSubmit = async()=>{
            const email = user?.email;
            try{
                setRequestLoading(true);
                console.log(requestDto);
                const res = await requestDocument(email,requestDto);
                console.log(res)
                alert("Demande envoyée avec succès !");
            }catch(err){
                console.error(err);
            }finally{
                setRequestLoading(false);
            }
            console.log(requestDto);
            
        }
        return(
            <div>
                <div className="row mt-4">
                    <div className="col">
                        <p><b>Sélectionnez le type de document : </b></p>
                        {
                            documentTypes.map((type)=>(
                                <label className="d-flex">
                                    <input type="checkbox" name="document" id="" onChange={()=>handleDocumentToggle(type.name)}/>
                                    {type.name} 
                                    {type.component && type.component}
                                </label>
                            ))
                        }
                    </div>
                    <div className="col">
                        <select className="styled-select" style={{
                            fontSize : "12px"
                        }} onChange={(e)=>handleChange(e)} value={requestDto.entity} name="entity">
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
                        <button className="submit-btn" onClick={handleSubmit}>
                        Soumettre
                    </button>
                    </div>
                </div>
            </div>
        )
    }

    const services = [
        {id: 1, name: "Profil", view: <UserInformationCard exception={"Without solde"}/>},
        {id: 2, name: "Nouvelle Demande", view: <RequestForm user={user}/>},
        {id: 3, name: "Historique des demandes", view:<DocumentRequestHistory user={user}/>},
        {id: 4, name: "Les demandes des collaborateurs", view:<EmployeeDocumentRequestHistory/>},
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