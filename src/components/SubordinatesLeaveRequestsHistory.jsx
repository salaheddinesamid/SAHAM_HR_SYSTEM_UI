import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { getSubordinatesLeaves, approveLeave, rejectLeave, approveSubordinatesLeave } from "../services/LeaveService";
import { Check, X } from "lucide-react";

export const SubordinatesLeaveRequestsHistory = ({ manager }) => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // ✅ Memoized fetch function (prevents unnecessary re-renders)
  const fetchRequests = useCallback(async () => {
    if (!manager?.email) return;
    try {
      setLoading(true);
      const data = await getSubordinatesLeaves(manager.email);
      setRequests(data || []);
    } catch (err) {
      console.error("Failed to fetch subordinates' leave requests:", err);
      setError("Une erreur s'est produite lors du chargement des demandes.");
    } finally {
      setLoading(false);
    }
  }, [manager?.email]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const statusMapper = (status) => {
    const map = {
      APPROVED: { message: "Approuvée", color: "bg-success" },
      REJECTED: { message: "Rejetée", color: "bg-danger" },
      IN_PROCESS: { message: "En attente", color: "bg-warning text-dark" },
      CANCELLED: { message: "Annulée", color: "bg-secondary" },
    };
    return map[status] || { message: "Inconnue", color: "bg-light text-dark" };
  };

  // Reject dialog:
  const RejectDialog = ({open,onClose,request})=>{
    if(!request) return null;

    const handleConfirm = async()=>{
        try{
            
        }catch(err){

        }finally{

        }
    }
  }

  // Separate dialog component
  const ApproveDialog = ({ open, onClose, request }) => {
    if (!request) return null;

    const handleConfirm = async () => {
      try {
        await approveSubordinatesLeave(request.id);
        onClose();
        fetchRequests(); // Refresh list
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

  const handleOpenDialog = (req) => {
    setCurrentRequest(req);
    setDialogOpen(true);
  };

  const handleReject = async (requestId) => {
    try {
      //await rejectLeave(requestId);
      fetchRequests();
    } catch (err) {
      console.error("Rejection failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-3">
      <h5></h5>
      {requests.length === 0 ? (
        <p>Aucune demande trouvée.</p>
      ) : (
        <Table className="table table-striped">
          <TableHead>
            <TableRow>
              <TableCell>Demandé par</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date de début</TableCell>
              <TableCell>Date de fin</TableCell>
              <TableCell>Nombre de jours</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Commentaire</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => {
              const { message, color } = statusMapper(req.status);
              return (
                <TableRow key={req.id}>
                  <TableCell>{req.requestedBy}</TableCell>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>{req.startDate}</TableCell>
                  <TableCell>{req.endDate}</TableCell>
                  <TableCell>{req.totalDays}</TableCell>
                  <TableCell>
                    <span className={`badge ${color}`}>{message}</span>
                  </TableCell>
                  <TableCell>{req.comment || "-"}</TableCell>
                  <TableCell>
                    {req.status === "IN_PROCESS" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleOpenDialog(req)}
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          className="ms-1"
                          onClick={() => handleReject(req.id)}
                        >
                          <X size={16} />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <ApproveDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        request={currentRequest}
      />
    </div>
  );
};
