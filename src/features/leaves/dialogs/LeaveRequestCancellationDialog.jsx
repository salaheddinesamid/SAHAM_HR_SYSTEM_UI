import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useState } from "react"
import { cancelLeaveRequest } from "../../../services/LeaveService";

export const LeaveRequestCancellationDialog = ({open, onClose,request, onSuccess})=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const handleConfirm = async()=>{
        const referenceNumber = request?.refNumber;
        try{
            setLoading(true);
            const res = await cancelLeaveRequest(referenceNumber);
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
                <CircularProgress/>
            )}
            <DialogContent>
                Êtes-vous sûr de vouloir annuler la demande de congé{" "}
                du{" "}
                <strong>{request?.startDate}</strong> au{" "}
                <strong>{request?.endDate}</strong> ?
            </DialogContent>
            
            <DialogActions>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Annuler
                </Button>
                <Button variant="contained" color="warning" onClick={handleConfirm}>
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    )
}