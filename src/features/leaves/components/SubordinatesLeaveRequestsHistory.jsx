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
  IconButton,
  Toolbar,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { Check, X } from "lucide-react";
import { Download, Search } from "@mui/icons-material";
import { saveAs } from "file-saver";
import { leaveStatusMapper, LeaveTypesMapper } from "../utils/LeaveUtils";
import { downloadFile } from "../../../services/FileStorageService";
import { approveSubordinatesLeave, getSubordinatesLeaveRequests, rejectSubordinatesLeave } from "../../../services/LeaveService";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";

export const SubordinatesLeaveRequestsHistory = ({ manager }) => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [filteredRequests,setFilteredRequests] = useState([]);
    const [searchQuery,setSearchQuery] = useState("");
    const [currentStatusFilter,setCurrentStatusFilter] = useState("ALL");
    const [error, setError] = useState(null);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
    const [rejectDialogOpen,setRejectDialogOpen] = useState(false);
    
    
    const filters = [
        { id: 1, name: "ALL", label: "Tous" },
        { id: 2, name: "APPROVED", label: "Approuvée" },
        { id: 3, name: "REJECTED", label: "Rejetée" },
        { id: 4, name: "IN_PROCESS", label: "En attente" },
        { id: 5, name: "CANCELED", label: "Annulée" }, // FIX: Correct spelling
    ];
    
    const fetchRequests = useCallback(async () => {
        if (!manager?.email) return;
        try {
            setLoading(true);
            console.log("...Fetching data")
            const data = await getSubordinatesLeaveRequests(manager?.email);
            setRequests(data || []);
            setFilteredRequests(data || [])
        } catch (err) {
            console.error("Failed to fetch subordinates' leave requests:", err);
            setError("Une erreur s'est produite lors du chargement des demandes.");
        } finally {
            setLoading(false);
        }
    }, [manager?.email]);

  const handleFilterChange = (filter) => {
    setCurrentStatusFilter(filter);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filtering logic
  useEffect(() => {
    let filtered = [...requests];

    if (currentStatusFilter !== "ALL") {
      filtered = filtered.filter((r) => r.status === currentStatusFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((r) =>
        r.refNumber?.includes(searchQuery)
      );
    }

    setFilteredRequests(filtered);
  }, [searchQuery, requests, currentStatusFilter])

  // Reject dialog:
  const RejectDialog = ({open,onClose,request})=>{
    if(!request) return null;

    const handleConfirm = async()=>{

        const id = request?.id;
        const managerEmail = manager?.email;
        try{
            setLoading(true);
            const res = await rejectSubordinatesLeave(id,managerEmail );
            if(res === 200){
                fetchRequests();
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
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    )
  }

  // Separate dialog component
  const ApproveDialog = ({ open, onClose, request }) => {
    if (!request) return null;

    const handleConfirm = async () => {
        const id = request?.id; // leave request ID
        const email = manager?.email; // approved by 
      try {
        await approveSubordinatesLeave(email, id);
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
  
  
  const handleOpenApprovalDialog = (req) => {
    setCurrentRequest(req);
    setApprovalDialogOpen(true);
  };

  const handeCloseApprovalDialog = ()=>{
    setCurrentRequest(null);
    setApprovalDialogOpen(false);
  }

  const handleCloseRejectionDialog = ()=>{
    setCurrentRequest(null);
    setRejectDialogOpen(false);
  }

  const handleOpenRejectionDialog = (req) => {
    setCurrentRequest(req);
    setRejectDialogOpen(true);
  };

  const handleDownloadDocument = async(path)=>{
    try{
      const res = await downloadFile(path); 
      saveAs(res)
    }catch(err){
      console.log(err);
    }
  }

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
      {requests.length === 0 ? (
        <p className="text-center">Aucune demande trouvée.</p>
      ) : (
        <div className="row">
            <Toolbar
            sx={{ display: "flex",
            justifyContent: "space-between",
            mb: 2,
            flexWrap: "wrap",}}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                    <TextField
                    size="small"
                    placeholder="Recherche par N° de Reference"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Search size={16} />
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        width: { xs: "100%", sm: 280 },
                      }}
                    />
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {filters.map((f) => (
                        <Button
                          key={f.id}
                          variant={currentStatusFilter === f.name ? "contained" : "outlined"}
                          size="small"
                          onClick={() => handleFilterChange(f.name)}
                          sx={{ borderRadius: 3, textTransform: "none", fontWeight: 500 }}
                        >
                          {f.label}
                        </Button>
                      ))}
                      </Box>
                    </Box>
                </Toolbar>
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
                            <TableCell>Documents</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRequests.map((req) => {
                            const { message, color } = leaveStatusMapper(req.status);
                            return (
                            <TableRow key={req.id}>
                                <TableCell>{req.requestedBy}</TableCell>
                                <TableCell>{LeaveTypesMapper(req.type)}</TableCell>
                                <TableCell>{LocalDateTimeMapper(req.startDate)}</TableCell>
                                <TableCell>{LocalDateTimeMapper(req.endDate)}</TableCell>
                                <TableCell>{req.totalDays}</TableCell>
                                <TableCell>
                                <span className={`badge ${color}`}>{message}</span>
                                </TableCell>
                                <TableCell>{req.comment || "-"}</TableCell>
                                <TableCell>{req.document !== null ? <IconButton >
                                    <Download onClick={()=>handleDownloadDocument(req.document)}/>

                                    </IconButton> : <p>No documents found</p>}</TableCell>
                                    <TableCell>
                                        {req.status === "IN_PROCESS" && (
                                            <>
                                            <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => handleOpenApprovalDialog(req)}>
                                                <Check size={16} />
                                            </Button>
                                            <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            className="ms-1"
                                            onClick={() => handleOpenRejectionDialog(req)}
                                            >
                                                <X size={16} />
                                            </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );})}
                    </TableBody>
                </Table>
            </div>
        )}
        <ApproveDialog
        open={approvalDialogOpen}
        onClose={handeCloseApprovalDialog}
        request={currentRequest}
      />
      <RejectDialog 
      open={rejectDialogOpen}
        onClose={handleCloseRejectionDialog}
        request={currentRequest}/>
    </div>
  );
};
