import { useEffect, useState } from "react"
import { getMyAbsenceRequests } from "../../../../services/AbsenceService";
import { Box, Button, CircularProgress, InputAdornment, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar } from "@mui/material";
import { LocalDateTimeMapper } from "../../../../utils/LocalDateTimeMapper";
import { Search } from "@mui/icons-material";
import { LeaveRequestCancellationDialog } from "../../leaves/dialogs/LeaveRequestCancellationDialog";
import { AbsenceTypesMapper, leaveStatusMapper } from "../../utils/LeaveUtils";

const AbsenceRequestsTable = ({requests, loading, currentPage, currentSize, setCurrentPage, handleChangeRowsPerPage, totalElements, onClickCancel})=>{
    return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><b>Ref N°</b></TableCell>
          <TableCell><b>Type</b></TableCell>
          <TableCell><b>Date de début</b></TableCell>
          <TableCell><b>Date de fin</b></TableCell>
          <TableCell><b>Nombre de jours</b></TableCell>
          <TableCell><b>Status</b></TableCell>
          <TableCell><b>Commentaire</b></TableCell>
          <TableCell><b>Actions</b></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {requests?.map((req, index) => (
          <TableRow key={req.id || index}>
            <TableCell>{req.referenceNumber}</TableCell>
            <TableCell>{AbsenceTypesMapper(req.type)}</TableCell>
            <TableCell>{LocalDateTimeMapper(req.startDate)}</TableCell>
            <TableCell>{LocalDateTimeMapper(req.endDate)}</TableCell>
            <TableCell>{req.totalDays}</TableCell>

            <TableCell>
              {(() => {
                const { message, color } = leaveStatusMapper(req.status);

                const isPendingManager = !req.approvedByManager;
                const isPendingHr = !req.approvedByHr;

                const label =
                  req.status === "IN_PROCESS"
                    ? isPendingManager && isPendingHr
                      ? `${message} (N+1)`
                      : !isPendingManager && isPendingHr
                      ? `${message} (RH)`
                      : message
                    : message;

                return <span className={`badge ${color}`}>{label}</span>;
              })()}
            </TableCell>

            <TableCell>{req.comment || "-"}</TableCell>

            <TableCell>
              {req.status === "IN_PROCESS" && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onClickCancel(req)}
                >
                  Annuler
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalElements} // when using backend pagination
        rowsPerPage={currentSize}
        page={currentPage}
        onPageChange={(e, newPage) => setCurrentPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Table>
  );
}

export const AbsenceRequests = ({user, filters})=>{
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequest] = useState([])
    const [loading, setLoading] = useState(false);
    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    const changeRowsPerPage = (e)=>{
        setCurrentSize(parseInt(e.target.value, 10));
        setCurrentPage(0);
    }

    // Search Part
    const [currentFilter, setCurrentFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");

    // Dialogs
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const handleOpenCancellationDialog = (request)=>{ 
        setSelectedRequest(request);
        setCancelDialogOpen(true);
    }
    const handleCloseCancellationDialog = ()=>{
        setSelectedRequest(null);
        setCancelDialogOpen(false);
    }

    const fetchAbsenceRequests = async(page = 0, size = 8)=>{
        const email = user?.email;
        try{
            setLoading(true);
            const res = await getMyAbsenceRequests(email, page, size);
            setRequests(res?.content);
            setFilteredRequest(res?.content);
            setTotalElements(res?.totalElements);
            console.log(res);
        }catch(err){

        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchAbsenceRequests(currentPage, currentSize);
    },[currentPage, currentSize])

    useEffect(()=>{
        let filtered = [...requests];
        if(currentFilter !== "ALL"){
            filtered = filtered.filter((r)=> r.status === currentFilter);
        }
        if(searchQuery.trim() !== ""){
            filtered = 
                 filtered.filter((r)=> r.refNumber?.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
        }
        if(startDate !== ""){
          filtered = filtered.filter((r)=> r?.startDate === startDate);
        }
        setFilteredRequest(filtered);
    }, [requests, searchQuery, currentFilter, startDate])

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
              <TextField
              type="date"
              label="Date de départ"
              value={startDate}
              InputLabelProps={{shrink : true}}
              onChange={(e)=> setStartDate(e.target.value)}
              />
            </Box>
          </Toolbar>
          <AbsenceRequestsTable
            requests={filteredRequests}
            loading={loading}
            currentPage={currentPage}
            currentSize={currentSize}
            setCurrentPage={setCurrentPage}
            handleChangeRowsPerPage={changeRowsPerPage}
            totalElements={totalElements}
            onClickCancel={handleOpenCancellationDialog}
          />
        </>
      )}
      <LeaveRequestCancellationDialog
        open={cancelDialogOpen}
        onClose={handleCloseCancellationDialog}
        request={selectedRequest}
        onSuccess={() => fetchAbsenceRequests(currentPage, currentSize)}
      />
    </div>
  );
}