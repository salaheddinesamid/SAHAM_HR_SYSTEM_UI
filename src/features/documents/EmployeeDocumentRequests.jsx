import { useEffect, useState } from "react"
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DocumentRequestApprovalDialog } from "./dialogs/DocumentRequestApprovalDialog";
import { Check } from "lucide-react";
import { getAllPendingRequests } from "../../services/DocumentService";

export const EmployeeDocumentRequestHistory = ()=>{

    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);
    const [requestApprovalDialogOpen,setRequestApprovalDialogOpen] = useState(false);
    const [selectedRequest,setSelectedRequest] = useState(requests[1]);

    const handleOpenApprovalDialog = (request)=>{
        setSelectedRequest(request);
        setRequestApprovalDialogOpen(true);
    }

    const handleCloseApprovalDialog = ()=>{
        setSelectedRequest(null);
        setRequestApprovalDialogOpen(false);
    }
    

    const fetchAllRequests = async()=>{
        try{
            setLoading(true);
            const res = await getAllPendingRequests();
            setRequests(res);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchAllRequests();
    },[])

    return(
        <div className="row">
            {loading && requests.length === 0 && (
                <CircularProgress/>
            )}
            {!loading && requests.length !== 0 && (
                <Table>
                    <TableHead>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell><b>Nom et Prenom</b></TableCell>
                        <TableCell><b>Les documents demandee</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableHead>
                    <TableBody>
                        {requests.map((r)=>(
                            <TableRow key={r.id}>
                                <TableCell>{r.requestDate}</TableCell>
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
                    <DocumentRequestApprovalDialog open={requestApprovalDialogOpen} onClose={handleCloseApprovalDialog} request={selectedRequest}/>
                </Table>
            )}
        </div>
        
    )
}