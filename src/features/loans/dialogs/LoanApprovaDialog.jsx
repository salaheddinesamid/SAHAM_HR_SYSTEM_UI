import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import { approveLoan } from "../../../services/LoanService";

export const LoanApprovalDialog = ({open, onClose, request, onSuccess})=>{

    const [loading,setLoading] = useState(false);

    const handleConfirm = async()=>{
        const id = request?.id;
        try{
            setLoading(true);
            const res = await approveLoan(id);
            onClose();
            onSuccess();
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
                    Êtes-vous sûr de vouloir approuver la demande de{" "}
                    <strong>{request?.requestedBy}</strong> du{" "}
                    <strong>{request?.startDate}</strong> au{" "}
                    <strong>{request?.endDate}</strong> ?
                </DialogContent>
            )}
            <DialogActions>
                <Button variant="outlined" color="secondary" onClick={onClose}>Annuler</Button>
                <Button variant="contained" color="success" onClick={handleConfirm}>Confirmer</Button>
            </DialogActions>
        </Dialog>
    )
}