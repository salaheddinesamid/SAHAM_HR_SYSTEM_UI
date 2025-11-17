import { useEffect, useState } from "react"
import { getAllRequestsForHr } from "../services/LeaveService";
import { Button, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Check, Truck, X } from "lucide-react";
import { LeaveApproval } from "./dialogs/LeaveApproval";
import { LeaveRejectionDialog } from "./dialogs/LeaveRejectionDialog";

// This component renders all the requests that are approved by Managers and waiting for HR approval
export const PendingLeaveRequests = ()=>{
    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);
    const [selectedRequest,setSelectedRequested] = useState(null);
    const [approvalDialogOpen,setApprovalDialogOpen] = useState(false);
    const [rejectionDialogOpen,setRejectionDialogOpen] = useState(false);

    //
    const handleOpenApprovalDialog = (request)=>{
      setSelectedRequested(request);
      setApprovalDialogOpen(true);
    }

    //
    const handleCloseApprovalDialog = ()=>{
      setSelectedRequested(null);
      setApprovalDialogOpen(false);
    }

    //
    const handleOpenRejectionDialog = (request)=>{
      setSelectedRequested(request);
      setRejectionDialogOpen(true);
    }

    //
    const handleCloseRejectionDialog = ()=>{
      setSelectedRequested(null);
      setRejectionDialogOpen(false);
    }

    const fetchAllRequests = async()=>{
        try{
            setLoading(true);
            // Fetch the requests:
            const res = await getAllRequestsForHr();
            setRequests(res)
        }catch(err){
            console.log(err);
        }
        finally{
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
            
        case "CANCELLED":
            return { message: "Annulée", color: "bg-secondary" };
        default:
            return { message: "Inconnue", color: "bg-light text-dark" };
        }
    };

    useEffect(()=>{
        fetchAllRequests();
    },[])

    return(
        <div className="container mt-3">
            {loading && (
                <CircularProgress/>
            )}

            {requests.length === 0 ? (
                <p className="text-center">Aucune demande trouvée.</p>
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
                          onClick={()=>handleOpenApprovalDialog(req)}
                          
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          variant="contained" 
                          color="error"
                          size="small"
                          className="ms-1"
                          onClick={()=>handleOpenRejectionDialog(req)}
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
          <LeaveApproval open={approvalDialogOpen} onClose={handleCloseApprovalDialog} request={selectedRequest} onSuccess={fetchAllRequests}/>
          <LeaveRejectionDialog open={rejectionDialogOpen} onClose={handleCloseRejectionDialog} request={selectedRequest} onSuccess={fetchAllRequests}/>
        </Table>
      )}
        </div>
    )
}