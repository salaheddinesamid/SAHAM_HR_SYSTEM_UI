import { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getAllDocumentRequests } from "../../services/DocumentService";

export const DocumentRequestHistory = ({user})=>{

    const [requests,setRequests] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null)
    const [currentFilter,setCurrentFilter] = useState("ALL");
    const [filteredRequests,setFilteredRequests] = useState([])

    const filters = [
        {id: 1, name: "Tous", value:"ALL"},
        {id: 2, name: "Approuvée", value:"APPROVED"},
        {id: 3, name: "En attente", value:"IN_PROCESS"},
        {id: 4, name: "Rejetée", value:"REJECTED"},
        
    ];

    const fetchRequests = async()=>{
        try{
            const email = user?.email;
            setLoading(true);
            console.log("Fetching....")
            const response = await getAllDocumentRequests(email);
            setRequests(response?.content);
            setFilteredRequests(response?.content);
        }
        catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
        if (filter === "ALL") setFilteredRequests(requests);
        else setFilteredRequests(requests.filter((a) => a.status === filter));
    };

    const RequestsFilter = ()=>{

        return(
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filters.map((f) => (
              <Button
                key={f.id}
                variant={currentFilter === f.value ? "contained" : "outlined"}
                size="small"
                onClick={()=> handleFilterChange(f.value)}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                {f.name}
              </Button>
            ))}
          </Box>
        )
    }

    const RequestsTable = ()=>{
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date de demande</TableCell>
                        <TableCell>List des documents</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRequests.map((r)=>(
                        <TableRow key={r.id}>
                            <TableCell>{r.requestDate}</TableCell>
                            <TableCell>{r.documents}</TableCell>
                            <TableCell>{(() => {
                                const { message, color } = StatusMapper(r.status);
                                return <span className={`badge ${color}`}>{message}</span>;
                            })()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                
            </Table>
        )
    }

    const StatusMapper = (status)=>{
        switch(status){
            case "IN_PROCESS":
                return {message: "En attente", color:"bg-warning text-dark"}
            case "APPROVED":
                return {message: "Approuvée", color: "bg-success"}
            case "REJECTED":
                return {message: "Rejetée", color:"bg-danger"}
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    return(
        <div className="row">
            
            {loading && (
                <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                </div>
            )}
            {!loading && !error && requests.length === 0 && (
                <p className="text-center text-muted mt-4">Aucune demande des documents trouvée.</p>
            )}
            {!loading && requests.length !== 0 && (
                <div className="row mt-3">
                    <div className="row">                                                                          
                        <RequestsFilter/>
                    </div>
                    <div className="row">
                        <RequestsTable/>
                    </div>
                </div>
            )}
        </div>
    )
}