import { useState } from "react";
import { rejectSubordinatesLeave } from "../../../../services/LeaveService";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const AbsenceRequestRejectionDialog = ({open, onClose, request, onSuccess})=>{
    const [loading, setLoading] = useState(false);
    if(!request) return null;

    const handleConfirm = async()=>{
        const refNumber = request?.referenceNumber;
        try{
            setLoading(true);
            const res = await rejectSubordinatesLeave(refNumber);
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
            <DialogTitle>Rejeter la demande</DialogTitle>
            <DialogContent>
                Êtes-vous sûr de vouloir rejeter la demande de{" "}
                <strong>{request.requestedBy}</strong> du{" "}
                <strong>{request.startDate}</strong> au{" "}
                <strong>{request.endDate}</strong> ?
            </DialogContent>
            
            <DialogActions>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Annuler
                </Button>
                <Button variant="contained" color="warning" onClick={handleConfirm}>
                    {loading ? <CircularProgress/> : "Confirmer"}
                </Button>
            </DialogActions>
        </Dialog>
    )
  }