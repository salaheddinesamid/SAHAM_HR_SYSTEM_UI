import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useState } from "react"
import { cancelLeave} from "../../../services/LeaveService";

export const LeaveCancellationDialog = ({open, onClose,leave, onSuccess})=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const handleConfirm = async()=>{
        const id = leave?.leaveId;
        try{
            setLoading(true);
            const res = await cancelLeave(id);
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
                Êtes-vous sûr de vouloir annuler votre congé{" "}
                du{" "}
                <strong>{leave?.fromDate}</strong> au{" "}
                <strong>{leave?.toDate}</strong> ?
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