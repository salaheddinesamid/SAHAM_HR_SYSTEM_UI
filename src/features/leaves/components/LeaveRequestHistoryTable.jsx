import { Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { leaveStatusMapper, LeaveTypesMapper } from "../utils/LeaveUtils";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";

export const LeaveRequestHistoryTable = ({
  loading,
  requests,
  onClickCancel,
  currentPage,
  setCurrentPage,
  currentSize,
  totalPages,
  totalElements,
  handleChangeRowsPerPage,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Ref N°</TableCell>
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
        {requests?.map((req, index) => (
          <TableRow key={req.id || index}>
            <TableCell>{req.refNumber}</TableCell>
            <TableCell>{LeaveTypesMapper(req.type)}</TableCell>
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
};
