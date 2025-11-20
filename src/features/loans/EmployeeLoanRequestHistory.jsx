import { Button, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import { getAllPendingRequests } from "../../services/LoanService";
import { loanAmountMapper, loanTypeMapper } from "./utils/Mapper";
import { Check, X } from "lucide-react";
import { LoanApprovalDialog } from "./dialogs/LoanApprovaDialog";
import { LocalDateTimeMapper } from "../../utils/LocalDateTimeMapper";

export const EmployeeLoanRequests = ()=>{

    const [requests,setRequests] = useState([]);
    const [loading,setLoading] = useState(false);
    const [selectedRequest,setSelectedRequest] = useState(null);
    const [loanApprovalDialogOpen,setLoanApprovalDialogOpen] = useState(false);

    // fetch pending loan requests
    const fetchEmployeeRequests = async()=>{
        try{
            setLoading(true);
            const res = await getAllPendingRequests();
            setRequests(res);
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
                <Table>
                    <TableHead>
                        <TableCell><b>Demande par</b></TableCell>
                        <TableCell><b>Date de soumission</b></TableCell>
                        <TableCell><b>Type de demande</b></TableCell>
                        <TableCell><b>Montant (MAD)</b></TableCell>
                        <TableCell><b>Motif</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableHead>
                    <TableBody>
                        {requests && requests   .map((r)=>(
                            <TableRow>
                                <TableCell>{r?.requestedBy}</TableCell>
                                <TableCell>{LocalDateTimeMapper(r?.issueDate)}</TableCell>
                                <TableCell>{loanTypeMapper(r?.type)}</TableCell>
                                <TableCell>{loanAmountMapper(r?.amount)}</TableCell>
                                <TableCell>{r?.motif}</TableCell>
                                <TableCell>
                                    {r?.status === "IN_PROCESS" && (
                                        <>
                                        <Button variant="contained" color="success" size="small" onClick={()=> handleOpenApprovalDialog(r)}>
                                            <Check size={16} />
                                        </Button>
                                        <Button variant="contained" color="error" size="small" className="ms-1">
                                            <X size={16} />
                                        </Button>
                                    </>
                                )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <LoanApprovalDialog open={loanApprovalDialogOpen} onClose={handleCloseApprovalDialog} request={selectedRequest} onSuccess={fetchEmployeeRequests}/>
                </Table>
            )}
        </div>
    )
}