import { useState } from "react";
import { Alert, CircularProgress, Snackbar, TextField } from "@mui/material";
import { LoanHistory } from "./LoanHistory";
import { UserInformationCard } from "../leaves/UserInformationCard";
import { applyLoan } from "../../services/LoanService";
import { EmployeeLoanRequests } from "./EmployeeLoanRequestHistory";
import { CheckIcon, TriangleAlert } from "lucide-react";


export const Loan = ()=>{
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [selectedService, setSelectedService] = useState(1);
    const [loading,setLoading]= useState(false);
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState("");

    // handle submit both requests (Pret/Avance)
    const handleSubmitRequest = async(request)=>{
        const email = user?.email;
        try{
            setLoading(true);
            const res = await applyLoan(email,request);
            setSuccess(true);
            console.log(request);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    // (These two forms needs to be re-factored)

    // This form handles (Pret-interne) loan requests
    const PretInternForm = ()=>{
        const [requestDto,setRequestDto] = useState({
            loanType : "NORMAL",
            amount : 0,
            motif : ""
        })

        const handleChange = (e)=>{
            const {name,value} = e.target;
            setRequestDto((prev)=>({
                ...prev,
                [name] : value
            }))
        }
        return(
            <div className="row">
                {loading && (
                    <CircularProgress/>
                )}
                {!loading && (
                    <div className="row">
                        <Snackbar
                                open={success}
                                autoHideDuration={4000}
                                onClose={() => setSuccess(false)}
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
                        <h4>Demande de Prêt</h4>
                        <div className="row mt-3">
                            <div className="col">
                                <TextField
                                label="Montant"
                                type="number"
                                name="amount"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                onChange={handleChange}
                                placeholder="Montant"/>
                            </div>
                        <div className="col">
                            <textarea class="form-control" name="motif" onChange={handleChange} placeholder="Motif" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xl-4">
                            <button className="submit-btn" onClick={()=>handleSubmitRequest(requestDto)}>Soumettre</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        )
    }

    // This form handles (Avance) loan requests
    const AvanceForm = ()=>{
        const [requestDto,setRequestDto] = useState({
            loanType : "ADVANCE",
            amount : 0,
            motif : "" 
        });

        const handleChange = (e)=>{
            const {name, value} = e.target;
            setRequestDto((prev)=>({
                ...prev,
                [name] : value
            }))
        }
        return(
            <div className="row">
                {loading && (
                    <CircularProgress/>
                )}
                {!loading && (
                    <div className="row">
                        <h4>Demande d'avance</h4>
                        <div className="row mt-3">
                            <div className="col">
                                <TextField
                                label="Montant"
                                type="number"
                                name="amount"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                onChange={handleChange}
                                placeholder="Montant"/>
                            </div>
                        <div className="col">
                            <textarea class="form-control" name="motif" onChange={handleChange} placeholder="Motif" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xl-4">
                            <button className="submit-btn" onClick={()=>handleSubmitRequest(requestDto)}>Soumettre</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        )
    }

    // This component is responsible for rendering new loan request forms.
    const NewRequest = ()=>{
        const [selectedType,setSelectedType] = useState(1);
        const types = [
            {id: 1, name: "Prêt Interne", view: <PretInternForm/>},
            {id: 2, name: "Avance", view: <AvanceForm/>}
        ]
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
        {id: 1, name: "Profil", view: <UserInformationCard exception={"Without solde"} email={user?.email}/>},
        {id: 2, name: "Nouvelle Demande", view: <NewRequest/>},
        {id: 3, name: "Historique des demandes", view:<LoanHistory user={user}/>},
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