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
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material"; 
import { Check, Search, X } from "lucide-react";
import { loanStatusMapper } from "../../../loans/utils/Mapper";
import { getAllRequestsForHr } from "../../../../services/LeaveService";
import { leaveStatusMapper, LeaveTypesMapper } from "../../utils/LeaveUtils";
import { LocalDateTimeMapper } from "../../../../utils/LocalDateTimeMapper";
import { LeaveCancellationDialog } from "../dialogs/LeaveCancellationDialog";
import { LeaveRejectionDialog } from "../dialogs/LeaveRejectionDialog";
import { LeaveApproval } from "../dialogs/LeaveApproval";

// This component renders all the requests for HR
export const LeaveRequestHistoryForHR = () => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);

    // Search and Filer
    const [searchQuery, setSearchQuery] = useState("");
    const [currentFilter, setCurrentFilter] = useState("ALL");

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
    const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
    const [cancelDialogOpen,setCancelDialogOpen] = useState(false);

    // Table pagination:
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

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

  // haldle change rows per page
  const changeRowsPerPage = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      const res = await getAllRequestsForHr(currentPage, pageSize);
      setRequests(res?.content);
      setTotalElements(res?.totalElements);
      setPageSize(res?.size);
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
    { id: 5, name: "CANCELED", label: "Annulée" }, // FIX: Correct spelling
  ];

  useEffect(() => {
    fetchAllRequests();
  }, [currentPage, pageSize]);

  // Filtering logic
  useEffect(() => {
    let filtered = [...requests];

    if (currentFilter !== "ALL") {
      filtered = filtered.filter((r) => r.status === currentFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((r) =>
        r.requestedBy?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  }, [searchQuery, requests, currentFilter]);


  return (
    <div className="row mt-3">
      {loading ? (
        <CircularProgress />
      ) : !loading && requests.length === 0 ? (
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
            placeholder="Recherche par Nom et Prénom"
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

          <Table className="">
            <TableHead>
              <TableRow>
                <TableCell><b>Ref N°</b></TableCell>
                <TableCell><b>Demandé par</b></TableCell>
                <TableCell><b>Type</b></TableCell>
                <TableCell><b>Date de début</b></TableCell>
                <TableCell><b>Date de fin</b></TableCell>
                <TableCell><b>Nombre de jours</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Commentaire</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((req) => {
                const { message, color } = loanStatusMapper(req.status);
                const type = LeaveTypesMapper(req?.type)
                return (
                  <TableRow key={req.id}>
                    <TableCell>{req.refNumber}</TableCell>
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
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalElements} // when using backend pagination
            rowsPerPage={pageSize}
            page={currentPage}
            onPageChange={(e, newPage) => setCurrentPage(newPage)}
            onRowsPerPageChange={changeRowsPerPage}
            />
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
