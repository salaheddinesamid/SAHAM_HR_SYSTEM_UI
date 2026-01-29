import { Box, Button, CircularProgress, IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from "@mui/material";
import { useEffect, useState } from "react"
import { getAllPendingRequests } from "../../../services/LoanService";
import { loanAmountMapper, loanStatusMapper, loanTypeMapper } from "../utils/Mapper";
import { Check, X } from "lucide-react";
import { LoanApprovalDialog } from "../dialogs/LoanApprovaDialog";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";
import { LoanRejectionDialog } from "../dialogs/LoanRejectionDialog";
import { FileDownload, Search } from "@mui/icons-material";
import { LoanRequest } from "./LoanRequest";
import { LoanRequestPdfGenerator } from "../../../services/LoanRequestPdfGenerator";

export const EmployeeLoanRequests = ()=>{

    const [requests,setRequests] = useState([]);
    const [filteredRequests,setFilteredRequest] = useState([]);
    const [searchQuery,setSearchQuery] = useState("");
    const [currentStatusFilter,setCurrentStatusFilter] = useState("ALL");
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
    const fetchEmployeeRequests = async()=>{
        try{
            setLoading(true);
            const res = await getAllPendingRequests();
            setRequests(res);
            setFilteredRequest(res);
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

    useEffect(()=>{
        fetchEmployeeRequests();
    },[])
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
                    <Table>
                        <TableHead>
                            <TableCell><b>Demande par</b></TableCell>
                            <TableCell><b>Date de soumission</b></TableCell>
                            <TableCell><b>Type de demande</b></TableCell>
                            <TableCell><b>Montant (MAD)</b></TableCell>
                            <TableCell><b>Motif</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                            <TableCell>Télécharger le PDF</TableCell>
                            
                        </TableHead>
                        
                        <TableBody>
                        {filteredRequests && filteredRequests   .map((r)=>(
                            <TableRow>
                                <TableCell>{r?.requestedBy}</TableCell>
                                <TableCell>{LocalDateTimeMapper(r?.issueDate)}</TableCell>
                                <TableCell>{loanTypeMapper(r?.type)}</TableCell>
                                <TableCell>{loanAmountMapper(r?.amount)}</TableCell>
                                <TableCell>{r?.motif}</TableCell>
                                <TableCell>{(() => {
                                    const { message, color } = loanStatusMapper(r.status);
                                    return <span className={`badge ${color}`}>{message}</span>;
                                    })()}
                                </TableCell>
                                <TableCell>
                                    {r?.status === "IN_PROCESS" && (
                                        <>
                                        <Button variant="contained" color="success" size="small" onClick={()=> handleOpenApprovalDialog(r)}>
                                            <Check size={16} />
                                        </Button>
                                        <Button variant="contained" color="error" size="small" className="ms-1" onClick={()=> handleOpenRejectionDialog(r)}>
                                            <X size={16} />
                                        </Button>
                                    </>
                                )}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={()=>handleGenerateLoanRequestPDF(r)}>
                                        <FileDownload />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <LoanApprovalDialog open={loanApprovalDialogOpen} onClose={handleCloseApprovalDialog} request={selectedRequest} onSuccess={fetchEmployeeRequests}/>
                    <LoanRejectionDialog open={loanRejectionDialogOpen} onClose={handleCloseRejectionDialog} request={selectedRequest} onSuccess={fetchEmployeeRequests}/>
                </Table>
                </div>
            )}
        </div>
    )
}