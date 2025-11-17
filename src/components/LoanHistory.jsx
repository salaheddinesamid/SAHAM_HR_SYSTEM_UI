import { useEffect, useState } from "react"
import { getAllEmployeeRequests } from "../services/LoanService";
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

        }finally{
            setLoading(false);
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
                        <TableCell>Date</TableCell>
                        <TableCell>Type de demande</TableCell>
                        <TableCell>Montant</TableCell>
                        <TableCell>Status</TableCell>
                    </TableHead>
                    <TableBody>
                        {requests.map((r)=>(
                            <TableRow>
                                <TableCell>{r?.issueDate}</TableCell>
                                <TableCell>{r?.type}</TableCell>
                                <TableCell>{r?.amount}</TableCell>
                                <TableCell>{r?.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}