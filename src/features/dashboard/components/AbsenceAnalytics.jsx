import { Box, Paper, Typography } from "@mui/material";
import { StatCard } from "./StatCard";
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from "react";
import { getAbsenceAnalyticsOverview } from "../../../services/AnalyticsService";

const data = [
      { label: 'Group C', value: 300, color: '#FFBB28' },
      { label: 'Group D', value: 200, color: '#FF8042' },
];

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function DonutChart() {
  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
      {...settings}
    />
  );
}


export const AbsenceAnalytics = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [currentEntity, setCurrentEntity] = useState("ALL");
  const [currentType, setCurrentType] = useState("ALL");
  const [currentDepartment, setCurrentDepartment] = useState("ALL");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const fetchData = async(type, from, to, entity, department) =>{
    try{
      setLoading(true);
      const res = await getAbsenceAnalyticsOverview(type, from, to, department, entity);
      setData(res);
      console.log(res);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchData(currentType, from, to, currentEntity, currentDepartment);
  }, [currentType, currentEntity, currentDepartment])
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(145deg,#ffffff,#f4f7fb)",
        boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
      }}
    >
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700} color="#004170">
          Analyse des absences
        </Typography>

        <Typography color="text.secondary">
          Indicateurs clés sur l’absentéisme des collaborateurs
        </Typography>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
        gap={4}
        alignItems="center"
      >
        <DonutChart />

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)" }}
          gap={3}
        >
          <StatCard label="Nombre total d’absences" value={data?.totalAbsenceRequests || 0} />
          <StatCard label="Taux d’absentéisme (%)" value={"3.4%"} />
          <StatCard label="Moyenne jours / employé" value={2.1} />
          <StatCard label="Département le plus impacté" value="IT" />
        </Box>
      </Box>
    </Paper>
  );
};
