import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import { rejectLoan } from "../../../services/LoanService";
import { loanAmountMapper, loanTypeMapper } from "../utils/Mapper";

export const LoanRejectionDialog = ({open,onClose,request,onSuccess})=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const handleConfirm = async()=>{
        const id = request?.id;
        try{
            setLoading(true);
            const res = await rejectLoan(id);
            if(res === 200){
                onSuccess();
                onClose();
            }
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    return(
        <Dialog open={open} onClose={onClose}>
           <DialogTitle></DialogTitle>
            {loading && (
                <CircularProgress/>
            )}

            {!loading && (
                <DialogContent>
                    Êtes-vous sûr de vouloir rejeter la demande de {loanTypeMapper(request?.type)} {" "}
                    de <b>{loanAmountMapper(request?.amount)} MAD</b> demandé par <strong>{request?.requestedBy}</strong> du{" "}
                </DialogContent>
            )}
            <DialogActions>
                <Button variant="outlined" color="secondary" onClick={onClose}>Annuler</Button>
                <Button variant="contained" color="error" onClick={handleConfirm}>Rejeter</Button>
            </DialogActions> 
        </Dialog>
    )
}