import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useState } from "react"
import { cancelLeave } from "../../../../services/LeaveService";

export const LeaveCancellationDialog = ({open, onClose, request, onSuccess})=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const handleConfirm = async()=>{
        const refNumber = request?.refNumber;
        try{
            setLoading(true);
            const res = await cancelLeave(refNumber);
            if(res.status === 200){
                onSuccess();
                onClose();
            }
        }catch(err){
            console.log(err);
            setError(err?.message)
        }finally{
            setLoading(false);
        }
    }
    return(
        <Dialog open={open} onClose={onClose}>
    {loading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <CircularProgress />
        </div>
    )}
    
    <DialogContent dividers>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            Vous êtes sur le point d’annuler le congé de l’employé. <b>{request?.requestedBy}</b>
        </p>

        <p style={{ fontSize: "16px" }}>
            Période concernée :<br/>
            <strong>Du {request?.startDate}</strong> au <strong>{request?.endDate}</strong>
        </p>

        <p style={{ fontSize: "16px", marginTop: "15px" }}>
            Cette action entraînera automatiquement le <strong>remboursement du solde de congés</strong> correspondant.
        </p>
    </DialogContent>

    <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
            Retour
        </Button>
        <Button variant="contained" color="warning" onClick={handleConfirm}>
            Confirmer l’annulation
        </Button>
    </DialogActions>
</Dialog>

    )
}