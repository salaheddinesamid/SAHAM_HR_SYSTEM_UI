import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { approveAbsence } from "../../../../services/AbsenceService";
import { useState } from "react";

export const AbsenceApprovalDialog = ({ open, onClose, request, onSuccess}) => {
    const [loading, setLoading] = useState(false);
    if (!request) return null;

    const handleConfirm = async () => {
        const refNumber = request?.referenceNumber; // Reference Number
        try {
            setLoading(true);
            const res = await approveAbsence(refNumber);
            if(res === 200){
                onSuccess();
                onClose(); // Refresh list
            }
        } catch (err) {
            console.error("Approval failed:", err);
        }
        finally{
            setLoading(false);
        }
    };

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmer la demande</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir approuver la demande de{" "}
          <strong>{request.requestedBy}</strong> du{" "}
          <strong>{request.startDate}</strong> au{" "}
          <strong>{request.endDate}</strong> ?
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="contained" color="success" onClick={handleConfirm}>
            {loading ? <CircularProgress/> : "Confirmer"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };