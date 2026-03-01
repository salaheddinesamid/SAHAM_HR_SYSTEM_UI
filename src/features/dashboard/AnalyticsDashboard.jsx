import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper
} from "@mui/material";
import "./styles/Dashboard.css";
import { Overview } from "./components/Overview";
import { EmployeeAnalytics } from "./components/EmployeeAnalytics";
import { LeaveAnalytics } from "./components/LeaveAnalytics";
import { AbsenceAnalytics } from "./components/AbsenceAnalytics";

export const AnalyticsDashboard = () => {

  const views = [
    { id: 0, label: "Aperçu" , view: <Overview/>},
    { id: 1, label: "Absences" },
    { id: 2, label: "Congés" },
    { id: 3, label: "Collaborateurs" }
  ];

  const [selectedView, setSelectedView] = useState(0);

  const handleChangeView = (_, newValue) => {
    setSelectedView(newValue);
  };

  return (
    <Box className="analytics-container">
      
      <Box className="analytics-content">
        {/** Employee Analytics Part */}
        <Box mt={0} mb={5}>
          <EmployeeAnalytics/>
        </Box>
        <Box
        mb={3}>
          <LeaveAnalytics/>
          <AbsenceAnalytics/>
        </Box>
      </Box>

    </Box>
  );
};
