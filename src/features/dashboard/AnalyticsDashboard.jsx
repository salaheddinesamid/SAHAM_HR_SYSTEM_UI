import { useState } from "react";
import {
  Box,
} from "@mui/material";
import "./styles/Dashboard.css";
import { Overview } from "./components/Overview";
import { EmployeeAnalytics } from "./components/EmployeeAnalytics";
import { LeaveAnalytics } from "./components/LeaveAnalytics";
import { AbsenceAnalytics } from "./components/AbsenceAnalytics";
import { LoanAnalytics } from "./components/LoanAnalytics";

export const AnalyticsDashboard = () => {

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
          <LoanAnalytics/>
        </Box>
      </Box>

    </Box>
  );
};
