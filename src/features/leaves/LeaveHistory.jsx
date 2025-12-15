import { useEffect, useState } from "react";
import { getMyLeaveRequests } from "../../services/LeaveService";
import { Box, Button, CircularProgress, InputAdornment, TextField, Toolbar } from "@mui/material";
import { Search } from "lucide-react";
import { LeaveRequestHistoryTable } from "./components/LeaveRequestHistoryTable";
import { LeaveRequestCancellationDialog } from "./dialogs/LeaveRequestCancellationDialog";

export const LeaveHistory = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentFilter, setCurrentFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  // total pages and elements from the server side
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filters = [
    { id: 1, name: "ALL", label: "Tous" },
    { id: 2, name: "APPROVED", label: "Approuvée" },
    { id: 3, name: "REJECTED", label: "Rejetée" },
    { id: 4, name: "IN_PROCESS", label: "En attente" },
    { id: 5, name: "CANCELLED", label: "Annulée" },
  ];

  const fetchData = async (page = 0, size = 5) => {
    try {
      setLoading(true);
      const email = user?.email;
      const response = await getMyLeaveRequests(email, page, size);
      setRequests(response?.content || []);
      setFilteredRequest(response?.content || []);
      setTotalElements(response?.totalElements);
      console.log(totalElements);
    } catch (err) {
      console.error(err);
      setError("Failed to load leave history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPageNumber, pageSize);
  }, [currentPageNumber, pageSize]);

  // Apply filters + search
  useEffect(() => {
    let filtered = [...requests];

    if (currentFilter !== "ALL") {
      filtered = filtered.filter((r) => r.status === currentFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((r) =>
        r.refNumber?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRequest(filtered);
  }, [requests, currentFilter, searchQuery]);

  const openCancelDialog = (req) => {
    setSelectedRequest(req);
    setCancelDialogOpen(true);
  };

  const closeCancelDialog = () => {
    setSelectedRequest(null);
    setCancelDialogOpen(false);
  };

  const changeRowsPerPage = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setCurrentPageNumber(0);
  };

  return (
    <div className="leave-history-container p-4">
      {loading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}

      {!loading && requests.length > 0 && (
        <>
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
                    variant={currentFilter === f.name ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setCurrentFilter(f.name)}
                    sx={{ borderRadius: 3, textTransform: "none", fontWeight: 500 }}
                  >
                    {f.label}
                  </Button>
                ))}
              </Box>
            </Box>
          </Toolbar>
          <LeaveRequestHistoryTable
            requests={filteredRequests}
            loading={loading}
            currentPage={currentPageNumber}
            currentSize={pageSize}
            setCurrentPage={setCurrentPageNumber}
            handleChangeRowsPerPage={changeRowsPerPage}
            totalElements={totalElements}
            onClickCancel={openCancelDialog}
          />
        </>
      )}
      <LeaveRequestCancellationDialog
        open={cancelDialogOpen}
        onClose={closeCancelDialog}
        request={selectedRequest}
        onSuccess={() => fetchData(currentPageNumber, pageSize)}
      />
    </div>
  );
};
