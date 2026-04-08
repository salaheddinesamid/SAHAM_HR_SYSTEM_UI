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
import { ExpenseAnalytics } from "./components/ExpenseAnalytics";

export const AnalyticsDashboard = () => {

  return (
    <Box className="analytics-container">
      
      <Box className="analytics-content">
        <Box mt={0} mb={5}>
          <EmployeeAnalytics/>
        </Box>
        <div className="row">
          <div className="col"><LeaveAnalytics/></div>
          <div className="col"><AbsenceAnalytics/></div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <LoanAnalytics/>
          </div>
          <div className="col-xl-12">
            <ExpenseAnalytics/>
          </div>
        </div>
      </Box>

    </Box>
  );
};
