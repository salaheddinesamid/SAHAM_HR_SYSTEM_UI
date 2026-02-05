import {
  CircularProgress,
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
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Download, Search } from "@mui/icons-material";
import { downloadAbsenceMedicaleCertificate, getAllAbsenceRequestsForHR } from "../../../../services/AbsenceService";
import { AbsenceTypesMapper, leaveStatusMapper } from "../../utils/LeaveUtils";
import { saveAs } from "file-saver";
import { LocalDateTimeMapper } from "../../../../utils/LocalDateTimeMapper";
import Cookies from "js-cookie";
import { AbsenceApprovalDialog } from "../dialogs/AbsenceApprovalDialog";
import { AbsenceRejectionDialog } from "../dialogs/AbsenceRejectionDialog";

export const AbsenceRequestHistoryForHR = () => {
    const token = Cookies.get("accessToken");
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [filteredRequests,setFilteredRequests] = useState([]);
    const [searchQuery,setSearchQuery] = useState("");
    const [currentStatusFilter,setCurrentStatusFilter] = useState("ALL");
    const [error, setError] = useState(null);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
    const [rejectDialogOpen,setRejectDialogOpen] = useState(false);

    // Table pagination:
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    // haldle change rows per page
    const changeRowsPerPage = (e) => {
        setPageSize(parseInt(e.target.value, 10));
        setCurrentPageNumber(0);
    };
    
    const filters = [
        { id: 1, name: "ALL", label: "Tous" },
        { id: 2, name: "APPROVED", label: "Approuvée" },
        { id: 3, name: "REJECTED", label: "Rejetée" },
        { id: 4, name: "IN_PROCESS", label: "En attente" },
        { id: 5, name: "CANCELED", label: "Annulée" }, // FIX: Correct spelling
    ];
    
    const fetchRequests = async (page, size) => {
        try {
            setLoading(true);
            console.log("...Fetching data")
            const data = await getAllAbsenceRequestsForHR(page, size);
            setRequests(data?.content || []);
            setFilteredRequests(data?.content || []);
            setTotalElements(data?.totalElements);
            console.log(data?.content)
        } catch (err) {
            console.error("Failed to fetch subordinates' leave requests:", err);
            setError("Une erreur s'est produite lors du chargement des demandes.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleFilterChange = (filter) => {
        setCurrentStatusFilter(filter);
    };
    
    useEffect(() => {
        fetchRequests(currentPageNumber, pageSize);
    }, [currentPageNumber, pageSize]);
    
    // Filtering logic
    useEffect(() => {
        let filtered = [...requests];
        
        if (currentStatusFilter !== "ALL") {
            filtered = filtered.filter((r) => r.status === currentStatusFilter);
        }
        
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((r) =>
                r.requestedBy?.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        );}
        
        setFilteredRequests(filtered);
    
    }, [searchQuery, requests, currentStatusFilter])
    
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
      setRejectDialogOpen(false)
    }
    const handleOpenRejectionDialog = (req) => {
      setCurrentRequest(req);
      setRejectDialogOpen(true);
    };

  const handleDownloadDocument = async(path)=>{
    try{
      if(path !== null){
        console.log("Downloading Medical Certificate with path:", path);
        const res = await downloadAbsenceMedicaleCertificate(path); 
        saveAs(res)
      }
    }catch(err){
      console.log(err);
    }
  }
  
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
    <div className="row mt-3">
      {requests.length === 0 ? (
        <p className="text-center">Aucune demande trouvée.</p>
      ) : (
        <div className="row">
          <Toolbar
          sx={{ display: "flex",
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
                    <TableCell><b>Documents</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {filteredRequests.map((req) => {
              const { message, color } = leaveStatusMapper(req.status);
              return (
                <TableRow key={req.id}>
                  <TableCell>{req.referenceNumber}</TableCell>
                  <TableCell>{req.requestedBy}</TableCell>
                  <TableCell>{AbsenceTypesMapper(req.type)}</TableCell>
                  <TableCell>{LocalDateTimeMapper(req.startDate)}</TableCell>
                  <TableCell>{LocalDateTimeMapper(req.endDate)}</TableCell>
                  <TableCell>{req.totalDays}</TableCell>
                  <TableCell>
                    <span className={`badge ${color}`}>{message}</span>
                  </TableCell>
                  <TableCell>{req.comment || "-"}</TableCell>
                  <TableCell>{req.document !== null ? <IconButton >
                    <Download onClick={()=>handleDownloadDocument(req?.documentPath)}/>
                  </IconButton> : <p>No documents found</p>}</TableCell>
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
            page={currentPageNumber}
            onPageChange={(e, newPage) => setCurrentPageNumber(newPage)}
            onRowsPerPageChange={changeRowsPerPage}
            />
        </Table>
        </div>
      )}

      <AbsenceApprovalDialog
        open={approvalDialogOpen}
        onClose={handeCloseApprovalDialog}
        onSuccess={fetchRequests}
        request={currentRequest}
      />
      <AbsenceRejectionDialog 
      open={rejectDialogOpen}
        onClose={handleCloseRejectionDialog}
        onSuccess={fetchRequests}
        request={currentRequest}/>
    </div>
  );
};
