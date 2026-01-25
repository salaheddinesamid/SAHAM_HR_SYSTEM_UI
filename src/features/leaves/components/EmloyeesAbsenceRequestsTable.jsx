import { Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { Check, X } from "lucide-react";
import { AbsenceTypesMapper } from "../utils/LeaveUtils";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";
import { loanStatusMapper } from "../../loans/utils/Mapper";

export const EmployeesAbsenceRequestsTable = ({
    loading, 
    requests, 
    currentPage, 
    setCurrentPage, 
    currentSize, 
    totalElements, 
    handleOpenApprovalDialog, 
    handleOpenRejectionDialog, 
    handleChangeRowsPerPage

})=> {
    return(
        <Table className="">
        <TableHead>
            <TableRow>
                <TableCell>Demandé par</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date de début</TableCell>
                <TableCell>Date de fin</TableCell>
                <TableCell>Nombre de jours</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Commentaire</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {requests.map((req) => {
                const { message, color } = loanStatusMapper(req.status);
                const type = AbsenceTypesMapper(req?.type)
                return (
                <TableRow key={req.id}>
                    <TableCell>{req.requestedBy}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{LocalDateTimeMapper(req.startDate)}</TableCell>
                    <TableCell>{LocalDateTimeMapper(req.endDate)}</TableCell>
                    <TableCell>{req.totalDays}</TableCell>
                    <TableCell>
                        <span className={`badge ${color}`}>{message}</span>
                    </TableCell>
                    <TableCell>{req.comment || "-"}</TableCell>
                    <TableCell>
                        {req.status === "IN_PROCESS" && (
                            <>
                            <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleOpenApprovalDialog(req)}>
                                <Check size={16} />
                            </Button>
                            <Button
                            variant="contained"
                            color="error"
                            size="small"
                            className="ms-1"
                            onClick={() => handleOpenRejectionDialog(req)}>
                                <X size={16} />
                            </Button>
                            </>
                        )}
                        {req.status === "APPROVED" && (
                            <>
                            <Button
                            variant="contained"
                            color="error"
                            size="small"
                            className="ms-1"
                            >
                                    Annuler Le congé
                            </Button>
                            </>
                        )}
                    </TableCell>
                </TableRow>
            );
        })}
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
    )
}