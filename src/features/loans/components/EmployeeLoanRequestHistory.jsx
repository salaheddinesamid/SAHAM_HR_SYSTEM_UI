import { Box, Button, CircularProgress, IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { getAllPendingRequests } from "../../../services/LoanService";
import { loanAmountMapper, loanStatusMapper, loanTypeMapper } from "../utils/Mapper";
import { Check, X } from "lucide-react";
import { LoanApprovalDialog } from "../dialogs/LoanApprovaDialog";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";
import { LoanRejectionDialog } from "../dialogs/LoanRejectionDialog";
import { FileDownload, Search } from "@mui/icons-material";
import { LoanRequestPdfGenerator } from "../utils/LoanRequestPdfGenerator";

export const EmployeeLoanRequests = ()=>{

    const [requests,setRequests] = useState([]);
    const [filteredRequests,setFilteredRequest] = useState([]);
    // Filter and Search
    const [searchQuery,setSearchQuery] = useState("");
    const [currentStatusFilter,setCurrentStatusFilter] = useState("ALL");
    // Pagintation
    const [currentPage, setCuerrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [loading,setLoading] = useState(false);
    const [downloadError, setDownloadError] = useState("");
    const [selectedRequest,setSelectedRequest] = useState(null);
    const [loanApprovalDialogOpen,setLoanApprovalDialogOpen] = useState(false);
    const [loanRejectionDialogOpen,setLoanRejectionDialogOpen] = useState(false);

    const filters = [
        { id: 1, name: "ALL", label: "Tous" },
        { id: 2, name: "APPROVED", label: "Approuvée" },
        { id: 3, name: "REJECTED", label: "Rejetée" },
        { id: 4, name: "IN_PROCESS", label: "En attente" },
        { id: 5, name: "CANCELLED", label: "Annulée" }, // FIX: Correct spelling
    ];

    // fetch pending loan requests
    const fetchEmployeeRequests = async(page, size)=>{
        try{
            setLoading(true);
            const res = await getAllPendingRequests(page, size);
            setRequests(res?.content || []);
            setFilteredRequest(res?.content || []);
            setTotalElements(res?.totalElements);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    // handle opening dialog for approval
    const handleOpenApprovalDialog = (request)=>{
        setSelectedRequest(request);
        setLoanApprovalDialogOpen(true);
    }

    // handle close approval dialog
    const handleCloseApprovalDialog = ()=>{
        setSelectedRequest(null);
        setLoanApprovalDialogOpen(false);
    }

    // handle opening dialog for approval
    const handleOpenRejectionDialog = (request)=>{
        setSelectedRequest(request);
        setLoanRejectionDialogOpen(true);
    }

    // handle close approval dialog
    const handleCloseRejectionDialog = ()=>{
        setSelectedRequest(null);
        setLoanRejectionDialogOpen(false);
    }
    // handle change number of rows per page
    const changeRowsPerPage = (e) =>{
        setCurrentSize(parseInt(e.target.value));
        setCuerrentPage(0);
    }

    const handleFilterChange = (filter)=>{
        setCurrentStatusFilter(filter);
    }
    const handleGenerateLoanRequestPDF = async(loanRequest)=>{
        try{
            const res = LoanRequestPdfGenerator(loanRequest);
        }catch(err){
            setDownloadError(err);
        }
    }

    // handle search and filter:
    useEffect(()=>{
        let filtered = [...requests];
        if(currentStatusFilter !== "ALL"){
            filtered = requests.filter((request)=> request.status === currentStatusFilter);
        }

        if(searchQuery.trim() !== ""){
            filtered = filtered.filter((r)=> r.requestedBy?.toLowerCase().includes(searchQuery));
        }

        setFilteredRequest(filtered);

    },[searchQuery, currentStatusFilter, requests])

    // handle fetch requests
    useEffect(()=>{
        fetchEmployeeRequests();
    },[currentPage, currentSize])
    return(
        <div className="row">
            {loading && requests.length === 0 && (
                <CircularProgress/>
            )}
            {!loading && requests.length === 0 && (
                <p className="text-center mt-3">Aucune demande de Prêt/Avance trouvée.</p>
            )}
            {!loading && requests.length !== 0 && (
                <div className="row">
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
                    <Box sx={{ width: '100%', overflowX: 'auto' }}>
                        <Table hover>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell><b>Demandé par</b></TableCell>
                                    <TableCell><b>Date de soumission</b></TableCell>
                                    <TableCell><b>Type</b></TableCell>
                                    <TableCell align="right"><b>Montant (MAD)</b></TableCell>
                                    <TableCell><b>Motif</b></TableCell>
                                    <TableCell><b>Prélèvement</b></TableCell>
                                    <TableCell align="center"><b>Status</b></TableCell>
                                    <TableCell align="center"><b>PDF</b></TableCell>
                                    <TableCell align="right"><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                {filteredRequests && filteredRequests.length > 0 ? (
                                    filteredRequests.map((r) => {
                                        const { message, color } = loanStatusMapper(r.status);
                                        
                                        return (
                                        <TableRow key={r.id || r.issueDate} hover>
                                            <TableCell sx={{ fontWeight: 500 }}>
                                                {r?.employeeDetails?.employeeName}
                                            </TableCell>
                                            <TableCell>{LocalDateTimeMapper(r?.issueDate)}</TableCell>
                                            <TableCell>{loanTypeMapper(r?.type)}</TableCell>
                                            <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                                                {loanAmountMapper(r?.amount)}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title={r?.motif}>
                                                    <span>{r?.motif?.length > 20 ? `${r.motif.substring(0, 20)}...` : r.motif}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>{LocalDateTimeMapper(r?.dateOfCollection)}</TableCell>
                                            <TableCell align="center">
                                                <span className={`badge ${color}`} style={{ padding: '5px 10px', borderRadius: '4px' }}>
                                                    {message}
                                                </span>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Télécharger">
                                                    <IconButton onClick={() => handleGenerateLoanRequestPDF(r)} color="primary">
                                                        <FileDownload />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            
                                            <TableCell align="right">
                                                {r?.status === "IN_PROCESS" && (
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                        <Tooltip title="Approuver">
                                                            <Button variant="contained" color="success" size="small" onClick={() => handleOpenApprovalDialog(r)}>
                                                                <Check size={16} />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title="Rejeter">
                                                            <Button variant="contained" color="error" size="small" onClick={() => handleOpenRejectionDialog(r)}>
                                                                <X size={16} />
                                                            </Button>
                                                        </Tooltip>
                                                    </Box>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                );
                            })
                        ) : (
                        <TableRow>
                            <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                                <Typography variant="body2" color="textSecondary">Aucune demande trouvée</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalElements}
            rowsPerPage={currentSize}
            page={currentPage}
            onPageChange={(e, newPage) => setCuerrentPage(newPage)}
            onRowsPerPageChange={changeRowsPerPage}
            />
            
            <LoanApprovalDialog 
            open={loanApprovalDialogOpen} 
            onClose={handleCloseApprovalDialog} 
            request={selectedRequest} 
            onSuccess={fetchEmployeeRequests}
            />
            <LoanRejectionDialog 
            open={loanRejectionDialogOpen} 
            onClose={handleCloseRejectionDialog} 
            request={selectedRequest} 
            onSuccess={fetchEmployeeRequests}
            />
        </Box>
    </div>
)}
</div>
)
}