import { useEffect, useState } from "react"
import { getAllPendingRequests } from "../services/DocumentService";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export const EmployeeDocumentRequestHistory = ()=>{

    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);

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
                        <TableCell></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}