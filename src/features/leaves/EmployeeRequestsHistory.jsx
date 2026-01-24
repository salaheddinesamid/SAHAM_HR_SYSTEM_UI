import { useState } from "react"
import { LeaveRequests } from "./components/LeaveRequests";
import { AbsenceRequests } from "./components/AbsenceRequests";
import { Badge, Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";

const filters = [
    { id: 1, name: "ALL", label: "Tous" },
    { id: 2, name: "APPROVED", label: "Approuvée" },
    { id: 3, name: "REJECTED", label: "Rejetée" },
    { id: 4, name: "IN_PROCESS", label: "En attente" },
    { id: 5, name: "CANCELED", label: "Annulée" },
];


export const EmployeeRequestsHistory = ()=>{
    const user = JSON.parse(localStorage.getItem("userDetails")); 
    const [currentComponent, setCurrentComponent] = useState("LEAVE");
    
    const components = {
        LEAVE : <LeaveRequests user={user} filters={filters}/>,
        ABSENCE : <AbsenceRequests filters={filters} user={user}/>
    }

    return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        background: "#f5f5f5",
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <ToggleButtonGroup
        value={currentComponent}
        exclusive
        onChange={(e, value) => value && setCurrentComponent(value)}
        sx={{ mb: 2 }}
      >
        <ToggleButton
          value="LEAVE"
          sx={{ textTransform: "none", fontWeight: 500, position: "relative" }}
        >
          Les demandes de congé
        </ToggleButton>
        <ToggleButton
          value="ABSENCE"
          sx={{ textTransform: "none", fontWeight: 500, position: "relative" }}
        >
          Les demandes d'absence
        </ToggleButton>
      </ToggleButtonGroup>

      <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        {components[currentComponent]}
      </Paper>
    </Box>
  );
}