import { useEffect, useState } from "react"
import { Box, Button, CircularProgress, InputAdornment, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar } from "@mui/material";
import { Check } from "lucide-react";
import { DocumentRequestApprovalDialog } from "../dialogs/DocumentRequestApprovalDialog";
import { getAllPendingRequests } from "../../../services/DocumentService";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";
import { Search } from "@mui/icons-material";

const filters = [
    { id: 1, name: "Tous", value: "ALL" },
    { id: 2, name: "Approuvée", value: "APPROVED" },
    { id: 3, name: "En attente", value: "IN_PROCESS" },
    { id: 4, name: "Rejetée", value: "REJECTED" }
];


export const EmployeeDocumentRequestHistory = ()=>{

    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [requestApprovalDialogOpen,setRequestApprovalDialogOpen] = useState(false);
    const [selectedRequest,setSelectedRequest] = useState(requests[1]);

    // Table pagination
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalElements, setTotalElements] = useState(0);

    // Search and Filters
    const [currentFilter, setCurrentFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    // handle filter change of the document request status
    const handleFilterChange = (status)=>{
        setCurrentFilter(status);
    };

    const handleOpenApprovalDialog = (request)=>{
        setSelectedRequest(request);
        setRequestApprovalDialogOpen(true);
    }
    // handle close the document request approval dialog
    const handleCloseApprovalDialog = ()=>{
        setSelectedRequest(null);
        setRequestApprovalDialogOpen(false);
    }

    const handleChangeRowsPerPage = (event)=>{
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPageNumber(0);
    }

    /**
     * 
     * @param {*} page 
     * @param {*} size 
     */
    const fetchAllRequests = async(page, size)=>{
        try{
            setLoading(true);
            const res = await getAllPendingRequests(page, size);
            setRequests(res?.content);
            setFilteredRequests(res?.content);
            setTotalElements(res?.totalElements);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchAllRequests(currentPageNumber, pageSize);
    },[currentPageNumber, pageSize]);

    // handle search query
    useEffect(()=>{
        let filtered = [...requests];

        if(currentFilter !== "ALL"){
            filtered = filtered?.filter((r)=> r?.status === currentFilter);
        }
        if(searchQuery?.trim() !== ""){
            filtered = filtered?.filter((r)=> r?.refNumber.includes(searchQuery))
        }
        setFilteredRequests(filtered);
    },[requests, currentFilter, searchQuery]);

    return(
        <div className="row">
            {loading && requests.length === 0 && (
                <CircularProgress/>
            )}
            {!loading && requests.length === 0 && (
                 <p className="text-center text-muted mt-3">Aucune demande des documents trouvée.</p>
            )}
            {!loading && requests.length !== 0 && (
                <div className="row">
                    <Toolbar style={{ display : 'flex', justifyContent : 'space-between', mb : 2}}>
                        <Box style={{ display : 'flex', gap : 2, alignItems : 'center'}}>
                            <TextField
                            size="small"
                            placeholder="Recherche par N° de Référence"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={16} />
                                </InputAdornment>
                            ),
                            }} sx={{ backgroundColor: "white", borderRadius: 2, width: { xs: "100%", sm: 280 } }}/>
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                {filters.map((f) => (
                                    <Button
                                    key={f.id}
                                    variant={currentFilter === f.value ? "contained" : "outlined"}
                                    size="small"
                                    onClick={() => handleFilterChange(f.value)}
                                    sx={{ borderRadius: 3, textTransform: "none", fontWeight: 500 }}>
                                        {f.name}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Toolbar>
                    <Table>
                        <TableHead>
                            <TableCell><b>N° de Reference</b></TableCell>
                            <TableCell><b>Date de demande</b></TableCell>
                            <TableCell><b>Demandé par</b></TableCell>
                            <TableCell><b>Les documents demandee</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableHead>
                        
                        <TableBody>
                            {filteredRequests?.map((r)=>(
                                <TableRow key={r.id}>
                                    <TableCell>{r?.refNumber}</TableCell>
                                    <TableCell>{LocalDateTimeMapper(r?.requestDate)}</TableCell>
                                    <TableCell>{r.requestedBy}</TableCell>
                                    <TableCell>{r.documents}</TableCell>
                                    <TableCell>
                                        <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={()=>handleOpenApprovalDialog(r)}
                                        >
                                            <Check size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <DocumentRequestApprovalDialog 
                        open={requestApprovalDialogOpen} 
                        onClose={handleCloseApprovalDialog} 
                        request={selectedRequest} onSuccess={fetchAllRequests}/>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalElements} // when using backend pagination
                        rowsPerPage={pageSize}
                        page={currentPageNumber}
                        onPageChange={(e, newPage) => setCurrentPageNumber(newPage)}
                        onRowsPerPageChange={handleChangeRowsPerPage}/>
                    </Table>
                </div>
                
                
            )}
        </div>
        
    )
}