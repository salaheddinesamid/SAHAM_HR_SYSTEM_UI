import { useState } from "react";
import { ToggleButtonGroup, ToggleButton, Box, Paper, Badge } from "@mui/material";
import { SubordinatesLeaveRequestsHistory } from "../leaves/components/SubordinatesLeaveRequestsHistory";
import { SubordinatesAbsenceRequestsHistory } from "../absences/components/SubordinatesAbsenceRequestHistory";

export const SubordinateRequestsHistory = ({ manager }) => {
  const [currentComponent, setCurrentComponent] = useState("LEAVE");

  // These counts should come from your API later
  const newLeaveRequests = 4;
  const newAbsenceRequests = 2;

  const components = {
    LEAVE: <SubordinatesLeaveRequestsHistory manager={manager} />,
    ABSENCE: <SubordinatesAbsenceRequestsHistory manager={manager} />,
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
        <ToggleButton
          value="LEAVE"
          sx={{ textTransform: "none", fontWeight: 500, position: "relative" }}
        >
          <Badge
            badgeContent={newLeaveRequests}
            color="error"
            overlap="circular"
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
            }}
          />
          Les demandes de congé
        </ToggleButton>
        <ToggleButton
          value="ABSENCE"
          sx={{ textTransform: "none", fontWeight: 500, position: "relative" }}
        >
          <Badge
            badgeContent={newAbsenceRequests}
            color="error"
            overlap="circular"
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
            }}
          />
          Les demandes d'absence
        </ToggleButton>
      </ToggleButtonGroup>

      <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        {components[currentComponent]}
      </Paper>
    </Box>
  );
};
