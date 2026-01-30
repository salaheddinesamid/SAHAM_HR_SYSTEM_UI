import { useEffect, useState } from "react"
import { getAllEmployeeRequests } from "../../../services/LoanService";
import { Box, Button, CircularProgress, IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar } from "@mui/material";
import { loanAmountMapper, loanStatusMapper, loanTypeMapper } from "../utils/Mapper";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";
import { LoanRequestPdfGenerator } from "../../../services/LoanRequestPdfGenerator";
import { FileDownload } from "@mui/icons-material";
import { Search } from "lucide-react";

const filters = [
    { id: 1, name: "ALL", label: "Tous" },
    { id: 2, name: "APPROVED", label: "Approuvée" },
    { id: 3, name: "REJECTED", label: "Rejetée" },
    { id: 4, name: "IN_PROCESS", label: "En attente" },
    { id: 5, name: "CANCELLED", label: "Annulée" }, // FIX: Correct spelling
];
// This component returns and renders all employee's loan requests
export const LoanHistory = ({user})=>{
    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);

    // search and filter:
    const [currentFilter, setCurrentFilter] = useState("ALL")
    const [searchQuery, setSearchQuery] = useState("");
    // Pagination:
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const changeRowsPerPage = (e)=>{
        setCurrentSize(parseInt(e.target.value, 10));
        setCurrentPage(0);
    }

    const handleFilterChange = (status) =>{
        setCurrentFilter(status);
    }

    const fetchRequests = async(page, size)=>{
        const email = user?.email;
        try{
            setLoading(true);
            const res = await getAllEmployeeRequests(email, page, size);
            setRequests(res?.content || []);
            setFilteredRequests(res?.content || []);
            setTotalElements(res?.totalElements || 0);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    const handleGenerateLoanRequestPDF = async(loanRequest) =>{
        const res = LoanRequestPdfGenerator(loanRequest);
    }

    // handle fetch requests
    useEffect(()=>{
        fetchRequests(currentPage, currentSize);
    },[currentPage, currentSize])

    // handle filter and search
    useEffect(()=>{
        let filtered = [...requests];

        // filter loan requests by status
        if(currentFilter !== "ALL"){
            filtered = filtered?.filter((r)=> r?.status === currentFilter);
        }
        if(searchQuery.trim() !== ""){
            filtered = filtered?.filter((r)=> r?.refNumber?.toLocaleLowerCase().includes(searchQuery.trim().toLocaleLowerCase()))
        }
        setFilteredRequests(filtered);
    }, [requests, currentFilter, searchQuery]);

    return(
        <div className="row">
            {loading && (
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
                    <Table>
                        <TableHead>
                            <TableCell><b>N° de Reference</b></TableCell>
                            <TableCell><b>Date de soumission</b></TableCell>
                            <TableCell><b>Type de demande</b></TableCell>
                            <TableCell><b>Montant (MAD)</b></TableCell>
                            <TableCell><b>Motif</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Télécharger PDF</b></TableCell>
                        </TableHead>
                        <TableBody>
                            {filteredRequests?.map((r)=>(
                                <TableRow>
                                    <TableCell>{r?.refNumber}</TableCell>
                                    <TableCell>{LocalDateTimeMapper(r?.issueDate)}</TableCell>
                                    <TableCell>{loanTypeMapper(r?.type)}</TableCell>
                                    <TableCell>{loanAmountMapper(r?.amount)}</TableCell>
                                    <TableCell>{r?.motif }</TableCell>
                                    <TableCell>{(() => {
                                        const { message, color } = loanStatusMapper(r.status);
                                        return <span className={`badge ${color}`}>{message}</span>;
                                    })()}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={()=>handleGenerateLoanRequestPDF(r)}>
                                            <FileDownload />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalElements}
                        rowsPerPage={currentSize}
                        page={currentPage}
                        onPageChange={(e, newPage)=> setCurrentPage(newPage)}
                        onRowsPerPageChange={changeRowsPerPage}
                        />
                    </Table>
                </div>
            )}
        </div>
    )
}