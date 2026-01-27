import { useEffect, useState } from "react"
import { getAllMyLeaves } from "../../../../services/LeaveService";
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { LeaveTypesMapper } from "../../utils/LeaveUtils";


export const MyLeaves = ({user})=>{
    const [leaves,setLeaves] = useState([]);
    const [loading,setLoading] = useState(false)

    const fetchLeaves = async()=>{
        const email = user?.email;
        try{
            setLoading(true);
            const res = await getAllMyLeaves(email);
            setLeaves(res);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(true);
        }
    }

    useEffect(()=>{
        fetchLeaves();
    },[]);


    return(
        <div className="container mt-3">
            {loading && leaves.length === 0 && (
                <CircularProgress/>
            )}
            {!loading && leaves.length === 0 && (
                <p className="text-center">Aucun congé trouvée.</p>
            )}
            <Table className="">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Ref N</b></TableCell>
                        <TableCell><b>Type</b></TableCell>
                        <TableCell><b>Date de début</b></TableCell>
                        <TableCell><b>Date de fin</b></TableCell>
                        <TableCell><b>Nombre de jours</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaves.map((leave) => {
                        return (
                        <TableRow key={leave.id}>
                            <TableCell>{leave?.refNumber}</TableCell>
                            <TableCell>{LeaveTypesMapper(leave?.leaveType)}</TableCell>
                            <TableCell>{leave.fromDate}</TableCell>
                            <TableCell>{leave.toDate}</TableCell>
                            <TableCell>{leave.totalDays}</TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </div>
    )
}