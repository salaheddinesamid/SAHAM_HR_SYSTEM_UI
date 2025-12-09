import { useEffect, useState } from "react";
import { getMyLeaveRequests } from "../../services/LeaveService";
import { Button, CircularProgress } from "@mui/material";
import { LeaveTypesMapper } from "./utils/LeaveUtils";
import { LeaveRequestCancellationDialog } from "./dialogs/LeaveRequestCancellationDialog";
import { LocalDateTimeMapper } from "../../utils/LocalDateTimeMapper";

export const LeaveHistory = ({user}) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelDialogOpen,setCancelDialogOpen] = useState(false);
  const [selectedRequest,setSelectedRequest] = useState(null);

  const handleOpenCancelDialog = (r)=>{
    setSelectedRequest(r);
    setCancelDialogOpen(true);
  }

  const handleCloseCancelDialog = ()=>{
    setSelectedRequest(null);
    setCancelDialogOpen(false);
  }

  const fetchData = async () => {
    const email = user?.email;
    try {
      setLoading(true);
      console.log("Fetching Data...");
      const response = await getMyLeaveRequests(email);
      setRequests(response || []); // ensure safe access
    } catch (err) {
      console.error("Error fetching leaves:", err);
      setError("Failed to load leave history");
    } finally {
      setLoading(false);
    }
  };
  
  const statusMapper = (status) => {
    switch (status) {
      case "APPROVED":
        return { message: "Approuvée", color: "bg-success" };
      case "REJECTED":
        return { message: "Rejetée", color: "bg-danger" };
      case "IN_PROCESS":
        return { message: "En attente", color: "bg-warning text-dark" };
      case "CANCELED":
        return { message: "Annulée", color: "bg-secondary" };
      default:
        return { message: "Inconnue", color: "bg-light text-dark" };
      }
    };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="leave-history-container p-4">
      {loading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {!loading && !error && requests.length === 0 && (
        <p className="text-center text-muted">Aucune demande de congé trouvée.</p>
      )}

      {!loading && requests.length > 0 && (
        <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ref N°</th>
              <th>Type</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Nombre de jours</th>
              <th>Status</th>
              <th>Commentaire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req.id || index}>
                <td>{req?.refNumber || ""}</td>
                <td>{LeaveTypesMapper(req.type)}</td>
                <td>{LocalDateTimeMapper(req.startDate)}</td>
                <td>{LocalDateTimeMapper(req.endDate)}</td>
                <td>{req.totalDays}</td>
                <td>
                    {(() => {
                        const { message, color } = statusMapper(req.status);
                        const isPendingManager = !req.approvedByManager; // if the request is not approved by manager yet
                        const isPendingHr = !req.approvedByHr; // if the request is not approved by HR yet
                        const showN1 = req?.status === "IN_PROCESS" && isPendingManager && isPendingHr;
                        const showHR = req?.status === "IN_PROCESS" && !isPendingManager && isPendingHr;
                        return (
                        <span className={`badge ${color}`}>
                          {`${message} ${showN1 ? "(N+1)" : showHR ? "(RH)" : ""}`}
                          </span>
                        );
                        })()}
                    </td>
                <td>{req.comment || "-"}</td>
                <td>
                  {req?.status === "IN_PROCESS" ? 
                  <Button
                  variant="contained"
                  color="error"
                  size="small"
                  className="ms-1"
                  onClick={()=> handleOpenCancelDialog(req)}
                  >
                    Annuler
                  </Button> : <></>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
      <LeaveRequestCancellationDialog open={cancelDialogOpen} onClose={handleCloseCancelDialog} request={selectedRequest} onSuccess={fetchData}/>
    </div>
  );
};
