import { useState } from "react";
import { requestDocument } from "../../services/DocumentService";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { CheckIcon, TriangleAlert } from "lucide-react";
import { UserInformationCard } from "../profile/UserInformationCard";
import { DocumentRequestHistory } from "./components/DocumentRequestHistory";
import { EmployeeDocumentRequestHistory } from "./components/EmployeeDocumentRequests";

export const DocumentRequest = ()=>{
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [selectedService, setSelectedService] = useState(1);
    const [requestLoading, setRequestLoading] = useState(false);
    const [submitSuccess,setSubmitSuccess] = useState(false);
    const [error,setError] = useState("");

    const documentTypes = [
        {id: 1, name: "Attestation de travail"},
        {id: 2, name: "Attestation de salaire"},
        {id: 3, name: "Attestation de domiciliation de salaire "},
        {id: 4, name: "Les trois derniers bulletins de paie"},
        {id: 5, name: "", component: <input type="text" placeholder="Autre"/>}
    ]

    /**
     * 
     * @param {*} param0 
     * @returns 
     */
    const RequestForm = ({user})=>{
        const [requestDto,setRequestDto] = useState({
            documents : [],
            entity : ""
        })
        /**
         * 
         * @param {*} document 
         */
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
                setSubmitSuccess(true);
            }catch(err){
                console.error(err);
                setError(err.message);
            }finally{
                setRequestLoading(false);
            }
            console.log(requestDto);
            
        }
        return(
            <div>
                <Snackbar
                open={submitSuccess}
                autoHideDuration={4000}
                onClose={() => setSubmitSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert 
                    severity="success" 
                    icon={<CheckIcon fontSize="inherit" />}
                    sx={{ width: '100%' }}>
                          Votre demande a été enregistrer avec success
                        </Alert>
                </Snackbar>
                <Snackbar
                open={error !== ""}
                autoHideDuration={4000}
                onClose={() => setError("")}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert 
                    severity="error" 
                    icon={<TriangleAlert fontSize="inherit"/>}
                    sx={{ width: '100%' }}>
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
                    }}>
                        <CircularProgress size={60} color="primary" />
                    </div>
                )}
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
        {id: 1, name: "Profil", view: <UserInformationCard exception={"Without solde"} email={user?.email}/>},
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
                {selectedService === 1 ? <></>: <UserInformationCard exception={"Without solde"} email={user?.email}/>}
              </div>
              <div className="row">
                {services.map((s) => (s.id === selectedService ? s.view : ""))}
              </div>
        </div>
    )
}