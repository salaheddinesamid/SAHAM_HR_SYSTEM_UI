import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar
} from "@mui/material";
import { Search } from "lucide-react";
import { getAllDocumentRequests } from "../../../services/DocumentService";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";

const StatusMapper = (status) => {
    switch (status) {
      case "IN_PROCESS":
        return { message: "En attente", color: "bg-warning text-dark" };
      case "APPROVED":
        return { message: "Approuvée", color: "bg-success" };
      case "REJECTED":
        return { message: "Rejetée", color: "bg-danger" };
      default:
        return { message: "-", color: "bg-secondary" };
    }
};
const RequestsTable = ({filteredRequests, totalElements, currentPageNumber, pageSize, setCurrentPageNumber, handleChangeRowsPerPage}) => (
    <>
      <Table className="table table-striped">
        <TableHead>
          <TableRow>
            <TableCell>N° de Reference</TableCell>
            <TableCell>Date de demande</TableCell>
            <TableCell>Liste des documents</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredRequests.map((r) => {
            const { message, color } = StatusMapper(r.status);

            return (
              <TableRow key={r.id}>
                <TableCell>{r.refNumber}</TableCell>
                <TableCell>
                  {LocalDateTimeMapper(r.requestDate)}
                </TableCell>
                <TableCell>{r.documents}</TableCell>
                <TableCell>
                  <span className={`badge ${color}`}>{message}</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={totalElements}
        page={currentPageNumber}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(e, newPage) => setCurrentPageNumber(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
export const DocumentRequestHistory = ({ user }) => {

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Requests search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("ALL");

  // Pagination
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  const filters = [
    { id: 1, name: "Tous", value: "ALL" },
    { id: 2, name: "Approuvée", value: "APPROVED" },
    { id: 3, name: "En attente", value: "IN_PROCESS" },
    { id: 4, name: "Rejetée", value: "REJECTED" }
  ];

  const fetchRequests = async (page, size) => {
    try {
      setLoading(true);
      const email = user?.email;

      const response = await getAllDocumentRequests(email, page, size);

      setRequests(response?.content || []);
      setFilteredRequests(response?.content || []);
      setTotalElements(response?.totalElements || 0);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);

    if (filter === "ALL") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(r => r.status === filter));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPageNumber(0);
  };

  // handle page and page size change
  useEffect(() => {
    fetchRequests(currentPageNumber, pageSize);
  }, [currentPageNumber, pageSize]);

  // handle search and filter change
  useEffect(()=>{
    let filtered = [...requests];
    if(currentFilter !== "ALL"){
      filtered = 
         filtered.filter((r)=> r?.status === currentFilter);
    }
    if(searchQuery.trim().toLocaleLowerCase !== ""){
      filtered = 
         filtered.filter((r)=> r?.refNumber.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
    }
    setFilteredRequests(filtered);
  },[requests, currentFilter, searchQuery])

  return (
    <div className="row">

      {loading && (
        <div className="text-center">
          <CircularProgress />
        </div>
      )}

      {!loading && !error && requests.length === 0 && (
        <p className="text-center text-muted mt-4">
          Aucune demande de documents trouvée.
        </p>
      )}

      {!loading && requests.length > 0 && (
        <div className="row mt-3">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
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
                }}
                sx={{ backgroundColor: "white", borderRadius: 2, width: { xs: "100%", sm: 280 } }}
                />
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
          <div className="mt-3">
            <RequestsTable 
            filteredRequests={filteredRequests} 
            totalElements={totalElements} 
            pageSize={pageSize} 
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            setCurrentPageNumber={setCurrentPageNumber}/>
          </div>
        </div>
      )}
    </div>
  );
};
