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
      
      <Paper elevation={1} className="analytics-header">
        <Box className="header-left">
          <Typography variant="h5" fontWeight={600}>
            {views[selectedView].label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tableau de bord analytique RH
          </Typography>
        </Box>

        <Tabs
          value={selectedView}
          onChange={handleChangeView}
          textColor="primary"
          indicatorColor="primary"
          className="header-tabs"
        >
          {views.map(view => (
            <Tab
              key={view.id}
              label={view.label}
              disableRipple
            />
          ))}
        </Tabs>
      </Paper>

      <Box className="analytics-content">
        {views.find((view)=> view.id === selectedView)?.view}
      </Box>

    </Box>
  );
};
