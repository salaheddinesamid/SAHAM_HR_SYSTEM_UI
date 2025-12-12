import { useEffect, useState } from "react";
import { getMyLeaveRequests } from "../../services/LeaveService";
import { Box, Button, CircularProgress, InputAdornment, TextField, Toolbar } from "@mui/material";
import { LeaveTypesMapper } from "./utils/LeaveUtils";
import { LeaveRequestCancellationDialog } from "./dialogs/LeaveRequestCancellationDialog";
import { LocalDateTimeMapper } from "../../utils/LocalDateTimeMapper";
import { Search } from "lucide-react";

export const LeaveHistory = ({user}) => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests,setFilteredRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentFilter,setCurrentFilter] = useState("ALL");
  const [searchQuery,setSearchQuery] = useState("");
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

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const fetchData = async () => {
    const email = user?.email;
    try {
      setLoading(true);
      console.log("Fetching Data...");
      const response = await getMyLeaveRequests(email);
      setRequests(response || []); // ensure safe access
      setFilteredRequest(response);
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
    const filters = [
      { id: 1, name: "ALL", label: "Tous" },
      { id: 2, name: "APPROVED", label: "Approuvée" },
      { id: 3, name: "REJECTED", label: "Rejetée" },
      { id: 4, name: "IN_PROCESS", label: "En attente" },
      { id: 5, name: "CANCELLED", label: "Annulée" }, // FIX: Correct spelling
    ];
    
    useEffect(() => {
      fetchData();
    }, []);
    
    useEffect(()=>{
      let filtered = [...requests];
      
      if(currentFilter != "ALL"){
        filtered = filtered.filter((r)=> r.status === currentFilter);
      }
      if(searchQuery.trim() !== ""){
        filtered = filtered.filter((r)=> r.refNumber?.includes(searchQuery));
      }
      setFilteredRequest(filtered);
    },[searchQuery, requests, currentFilter])

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
        <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
        }}>
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
            }}/>
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
            {filteredRequests?.map((req, index) => (
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
