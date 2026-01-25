import { useEffect, useState } from "react"
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { Check } from "lucide-react";
import { DocumentRequestApprovalDialog } from "../dialogs/DocumentRequestApprovalDialog";
import { getAllPendingRequests } from "../../../services/DocumentService";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";

export const EmployeeDocumentRequestHistory = ()=>{

    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);
    const [requestApprovalDialogOpen,setRequestApprovalDialogOpen] = useState(false);
    const [selectedRequest,setSelectedRequest] = useState(requests[1]);

    // Table pagination
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const handleOpenApprovalDialog = (request)=>{
        setSelectedRequest(request);
        setRequestApprovalDialogOpen(true);
    }

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
            const res = await getAllPendingRequests(currentPageNumber, pageSize);
            setRequests(res?.content);
            setTotalElements(res?.totalElements);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchAllRequests(currentPageNumber, pageSize);
    },[currentPageNumber, pageSize])

    return(
        <div className="row">
            {loading && requests.length === 0 && (
                <CircularProgress/>
            )}
            {!loading && requests.length === 0 && (
                 <p className="text-center text-muted mt-3">Aucune demande des documents trouvée.</p>
            )}
            {!loading && requests.length !== 0 && (
                <Table>
                    <TableHead>
                        <TableCell><b>Date de demande</b></TableCell>
                        <TableCell><b>Demandé par</b></TableCell>
                        <TableCell><b>Les documents demandee</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableHead>
                    <TableBody>
                        {requests.map((r)=>(
                            <TableRow key={r.id}>
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
                
            )}
        </div>
        
    )
}