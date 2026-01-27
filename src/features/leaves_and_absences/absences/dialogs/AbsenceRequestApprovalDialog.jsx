import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { approveSubordinate } from "../../../../services/AbsenceService";

export const AbsenceRequestApprovalDialog = ({ open, onClose, request, onSuccess}) => {
    if (!request) return null;

    const handleConfirm = async () => {
        const referenceNumber = request?.referenceNumber; // leave request Ref N° 
      try {
        const res = await approveSubordinate(referenceNumber);
        if(res === 200){
            onSuccess();
            onClose();
        }
      } catch (err) {
        console.error("Approval failed:", err);
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
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };