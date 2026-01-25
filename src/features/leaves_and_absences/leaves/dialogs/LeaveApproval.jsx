import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { finalLeaveApproval } from "../../../../services/LeaveService";

export const LeaveApproval = ({ open, onClose, request, onSuccess }) => {
    if (!request) return null;

    const handleConfirm = async () => {
        const id = request?.id;
      try {
        await finalLeaveApproval(id);
        onClose();
        onSuccess(); // Refresh list
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