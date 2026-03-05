import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useState } from "react"
import { cancelAbsenceRequest } from "../../../../services/AbsenceService";

export const AbsenceRequestCancellationDialog = ({open, onClose, request, onSuccess})=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const handleConfirm = async()=>{
        const refNumber = request?.referenceNumber;
        try{
            setLoading(true);
            const res = await cancelAbsenceRequest(refNumber);
            if(res === 200){
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
            Vous êtes sur le point votre demande d'absence?
        </p>

        <p style={{ fontSize: "16px" }}>
            Période concernée :<br/>
            <strong>Du {request?.startDate}</strong> au <strong>{request?.endDate}</strong>
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