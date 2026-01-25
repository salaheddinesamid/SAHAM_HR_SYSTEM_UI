import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { LeaveRequestHistoryForHR } from "../leaves/components/LeaveRequestHistoryForHR";
import { AbsenceRequestHistoryForHR } from "../absences/components/AbsenceRequestHistoryForHR";

export const RequestHistoryForHR = ()=>{
    const [currentComponent, setCurrentComponent] = useState("LEAVE")

    const components = {
        LEAVE: <LeaveRequestHistoryForHR/>,
        ABSENCE: <AbsenceRequestHistoryForHR/>
    };

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
        <ToggleButton value="LEAVE" sx={{ textTransform: "none", fontWeight: 500 }}>
          Les demandes de congé
        </ToggleButton>
        <ToggleButton value="ABSENCE" sx={{ textTransform: "none", fontWeight: 500 }}>
          Les demandes d'absence
        </ToggleButton>
      </ToggleButtonGroup>

      <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        {components[currentComponent]}
      </Paper>
    </Box>
  );
}