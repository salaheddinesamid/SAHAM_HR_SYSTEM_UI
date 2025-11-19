import { useEffect, useState } from "react"
import { getAllEmployeeRequests } from "../../services/LoanService";
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// This component returns and renders all employee's loan requests
export const LoanHistory = ({user})=>{
    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);

    const fetchRequests = async()=>{
        const email = user?.email;
        try{
            setLoading(true);
            const res = await getAllEmployeeRequests(email);
            setRequests(res);

        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const loanStatusMapper = (status) => {
    switch (status) {
        case "APPROVED":
            return { message: "Approuvée", color: "bg-success" };
            
        case "REJECTED":
            return { message: "Rejetée", color: "bg-danger" };
            
        case "IN_PROCESS":
            return { message: "En attente", color: "bg-warning text-dark" };
            
        case "CANCELLED":
            return { message: "Annulée", color: "bg-secondary" };
        default:
            return { message: "Inconnue", color: "bg-light text-dark" };
        }
    };

    const loanTypeMapper = (type)=>{
        switch(type){
            case "NORMAL":
                return "Prêt"
            case "ADVANCE":
                return "Avance"
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[user])

    return(
        <div className="row">
            {loading && (
                <CircularProgress/>
            )}
            {!loading && requests.length === 0 && (
                <p className="text-center mt-3">Aucune demande de Prêt/Avance trouvée.</p>
            )}

            {!loading && requests.length !== 0 && (
                <Table>
                    <TableHead>
                        <TableCell><b>Date de soumission</b></TableCell>
                        <TableCell><b>Type de demande</b></TableCell>
                        <TableCell><b>Montant (MAD)</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                    </TableHead>
                    <TableBody>
                        {requests.map((r)=>(
                            <TableRow>
                                <TableCell>{r?.issueDate}</TableCell>
                                <TableCell>{loanTypeMapper(r?.type)}</TableCell>
                                <TableCell>{r?.amount}</TableCell>
                                <TableCell>{(() => {
                        const { message, color } = loanStatusMapper(r.status);
                        return <span className={`badge ${color}`}>{message}</span>;
                        })()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}