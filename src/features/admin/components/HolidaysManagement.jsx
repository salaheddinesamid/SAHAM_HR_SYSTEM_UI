import { useEffect, useState } from "react"
import { getAllHolidays } from "../../../services/HolidayService";
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LocalDateTimeMapper } from "../../../utils/LocalDateTimeMapper";
import { HolidayUpdateDialog } from "../dialogs/HolidayUpdateDialog";

export const HolidaysManagement = ()=>{

    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedHoliday, setSelectedHoliday] = useState(null);
    const [holidayUpdateDialogOpen, setHolidayUpdateDialogOpen] = useState(false);

    /**
     * 
     */
    const fetchHolidays = async()=>{
        try {
            setLoading(true);
            const response = await getAllHolidays();
            setHolidays(response);
        }catch (err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleOpenEditHoliday = (holiday)=>{
        setSelectedHoliday(holiday);
        setHolidayUpdateDialogOpen(true);
    }

    const handleCloseEditHoliday = ()=>{
        setSelectedHoliday(null);
        setHolidayUpdateDialogOpen(false);
    }
    useEffect(()=>{
        fetchHolidays();
    },[])
    return(
       <Paper sx={{p:2}}>

        {loading && holidays.length === 0 && (
            <CircularProgress/>
        )}

        {!loading && holidays.length !== 0 && (
            <>
              <Table className="table table-striped">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell><b>Date de début</b></TableCell>
                        <TableCell><b>Date de fin</b></TableCell>
                        <TableCell><b>Nombre des jours</b></TableCell>
                        <TableCell><b>Dernier changement</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {holidays.map((h)=>(
                        <TableRow key={h?.id}>
                            <TableCell>{h?.name}</TableCell>
                            <TableCell>{LocalDateTimeMapper(h?.startDate)}</TableCell>
                            <TableCell>{LocalDateTimeMapper(h?.endDate)}</TableCell>
                            <TableCell>{h?.leaveDays}</TableCell>
                            <TableCell>{LocalDateTimeMapper(h?.lastUpdate)}</TableCell>
                            <TableCell>
                                <Tooltip title="Modifier">
                                    <IconButton onClick={()=> handleOpenEditHoliday(h)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Supprimer">
                                    <IconButton color="error">
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </>
        )}
        <HolidayUpdateDialog 
        open={holidayUpdateDialogOpen} 
        holiday={selectedHoliday} 
        onSuccess={fetchHolidays}
        onClose={handleCloseEditHoliday}/>
       </Paper>
    )
}