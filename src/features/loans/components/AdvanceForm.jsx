import { Alert, CircularProgress, Snackbar, TextField } from "@mui/material";
import { CheckIcon, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { applyLoan } from "../../../services/LoanService";

export const AdvanceForm = () =>{
    // fetch the current user details:
    const user = JSON.parse(localStorage.getItem("userDetails"));

    const [requestDto, setRequestDto] = useState({
        loanType : "NORMAL",
        amount : 0,
        motif : ""
    })
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    // handle request dto change
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRequestDto((prev)=>(
            {...prev, [name] : value}
        ))
    }

    // handle empty the request dto after submission
    const handleCleanDto = () =>{
        setRequestDto({
            loanType : "NORMAL",
            amount : 0,
            motif : ""
        })
    }
    
    // handle submit both requests (Pret/Avance)
    const handleSubmitRequest = async(request)=>{
        const email = user?.email;
        try{
            setLoading(true);
            const res = await applyLoan(email,request);
            if(res === 200){
                setSuccess(true);
                handleCleanDto();
            }
            setSuccess(true);
            console.log(request);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    return (
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