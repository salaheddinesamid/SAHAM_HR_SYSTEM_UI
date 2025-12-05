import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material"; 
import { Check, Search, X } from "lucide-react";
import { LeaveApproval } from "../dialogs/LeaveApproval";
import { LeaveRejectionDialog } from "../dialogs/LeaveRejectionDialog";
import { loanStatusMapper } from "../../loans/utils/Mapper";
import { getAllRequestsForHr } from "../../../services/LeaveService";
import { LeaveCancellationDialog } from "../dialogs/LeaveCancellationDialog";
import { leaveStatusMapper, LeaveTypesMapper } from "../utils/LeaveUtils";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";

// This component renders all the requests for HR
export const LeaveRequestHistoryForHR = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [cancelDialogOpen,setCancelDialogOpen] = useState(false);

  // Open dialogs
  const handleOpenApprovalDialog = (request) => {
    setSelectedRequest(request);
    setApprovalDialogOpen(true);
  };

  const handleOpenRejectionDialog = (request) => {
    setSelectedRequest(request);
    setRejectionDialogOpen(true);
  };

  // Close dialogs
  const handleCloseApprovalDialog = () => {
    setSelectedRequest(null);
    setApprovalDialogOpen(false);
  };

  const handleCloseRejectionDialog = () => {
    setSelectedRequest(null);
    setRejectionDialogOpen(false);
  };

  const handleOpenCancellationDialog = (request)=>{
    setSelectedRequest(request);
    setCancelDialogOpen(true);
  }
  const handleCloseCancellationDialog = (request)=>{
    setSelectedRequest(null);
    setCancelDialogOpen(false);
  }

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      const res = await getAllRequestsForHr();
      setRequests(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { id: 1, name: "ALL", label: "Tous" },
    { id: 2, name: "APPROVED", label: "Approuvée" },
    { id: 3, name: "REJECTED", label: "Rejetée" },
    { id: 4, name: "IN_PROCESS", label: "En attente" },
    { id: 5, name: "CANCELLED", label: "Annulée" }, // FIX: Correct spelling
  ];

  useEffect(() => {
    fetchAllRequests();
  }, []);

  // Filtering logic
  useEffect(() => {
    let filtered = [...requests];

    if (currentFilter !== "ALL") {
      filtered = filtered.filter((r) => r.status === currentFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((r) =>
        r.requestedBy?.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredRequests(filtered);
  }, [searchQuery, requests, currentFilter]);


  return (
    <div className="container mt-3">
      {loading ? (
        <CircularProgress />
      ) : requests.length === 0 ? (
        <p className="text-center">Aucune demande trouvée.</p>
      ) : (
        <div className="row">
          <Toolbar
          sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
        }}
        >
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
            <TextField
            size="small"
            placeholder="Recherche par nom de collaborateur"
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
                variant={currentFilter === f.name ? "contained" : "outlined"}
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

          <Table className="table table-striped" style={{ marginTop: 20 }}>
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
              {filteredRequests.map((req) => {
                const { message, color } = loanStatusMapper(req.status);
                const type = LeaveTypesMapper(req?.type)
                return (
                  <TableRow key={req.id}>
                    <TableCell>{req.requestedBy}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{LocalDateTimeMapper(req.startDate)}</TableCell>
                    <TableCell>{LocalDateTimeMapper(req.endDate)}</TableCell>
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
                            onClick={() => handleOpenApprovalDialog(req)}
                          >
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
                      {req.status === "APPROVED" && (
                        <>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            className="ms-1"
                            onClick={() => handleOpenCancellationDialog(req)}
                          >
                            Annuler Le congé
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <LeaveApproval
            open={approvalDialogOpen}
            onClose={handleCloseApprovalDialog}
            request={selectedRequest}
            onSuccess={fetchAllRequests}
          />
          <LeaveRejectionDialog
            open={rejectionDialogOpen}
            onClose={handleCloseRejectionDialog}
            request={selectedRequest}
            onSuccess={fetchAllRequests}
          />
          <LeaveCancellationDialog open={cancelDialogOpen} onClose={handleCloseCancellationDialog} request={selectedRequest} onSuccess={fetchAllRequests}/>
        </div>
      )}
    </div>
  );
};
