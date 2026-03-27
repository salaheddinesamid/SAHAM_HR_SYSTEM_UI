import { Box, Paper, TextField, Typography } from "@mui/material";
import { StatCard } from "./StatCard";
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from "react";
import { getAbsenceAnalyticsOverview } from "../../../services/AnalyticsService";

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function DonutChart({ data }) {
  return (
    <PieChart
      series={[
        {
          innerRadius: 50,
          outerRadius: 100,
          data,
          arcLabel: 'value',
        },
      ]}
      colors={['#d32f2f', '#9c27b0']}
      {...settings}
    />
  );
}

const departments = [
    { id : 1, label : "Département financier", value : "FINANCE_DEPARTMENT"},
    { id : 2, label : "Département juridique", value : "LEGAL_DEPARTMENT" },
    { id : 3, label : "Département informatique", value : "IT"},
    { id : 4, label : "Département ressources humaines", value : "HUMAN_RESOURCES_DEPARTMENT" },
    { id : 5, label : "Opérations", value : "OPERATIONS"},
    { id : 6, label : "Asset management", value : "ASSET_MANAGEMENT" },
    { id : 7, label : "Cabinet du DG", value : "CEO_OFFICE" },
    { id : 8, label : "Surveillance bancaire", value : "BANKING_SUPERVISION" },
]
const entities  = [
    { id : 1, label : "SAHAM Horizon", value : "SAHAM_HORIZON"},
    { id : 2, label : "SAHAM Finances", value : "SAHAM_FINANCES"},
    { id : 3, label : "SAHAM Foundation", value : "SAHAM_FOUNDATION"}
]


export const AbsenceAnalytics = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [chartData, setChartData] = useState([
    { label: 'Congés Annuel', value: 10},
    { label: 'Congés Exceptionnel', value: 20}
  ])

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
        marginBottom : 4,
        borderRadius: 4,
        background: "linear-gradient(145deg,#ffffff,#f4f7fb)",
        boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
      }}
    >
      <Box mb={3} display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="#004170">
            Analyse des absences
          </Typography>
          
          <Typography color="text.secondary">
            Indicateurs clés sur l’absentéisme des collaborateurs
          </Typography>
        </Box>
      </Box>
      <Box sx={{display : "flex", justifyContent : "space-between"}}>
        <TextField type="date" value={from} onChange={(e)=> setFrom(e.target.value)} label="From" InputLabelProps={{shrink : true}}/>
          <TextField type="date" value={to} onChange={(e)=> setTo(e.target.value)} label="To" InputLabelProps={{shrink : true}}/>
            <select name="" id="" value={currentDepartment} onChange={(e)=> setCurrentDepartment(e.target.value)}>
              <option value="">Filtrer par département</option>
              {departments.map((e)=>(
                <option value={e.value} key={e.id}>{e.label}</option>
              ))}
            </select>
            <select name="" id="" value={currentEntity} onChange={(e)=> setCurrentEntity(e.target.value)}>
              <option value="">Filtrer par entité</option>
              {entities.map((e)=>(
                <option value={e.value} key={e.id}>{e.label}</option>
              ))}
              </select>
      </Box>
      <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
          gap={4}
          alignItems="center">
            <DonutChart data={chartData}/>
            <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)" }}
            gap={3}>
              <StatCard label="Nombre total d’absences" value={data?.totalAbsenceRequests || 0} />
              <StatCard label="Taux d’absentéisme (%)" value={"3.4%"} />
              <StatCard label="Moyenne jours / employé" value={2.1} />
              <StatCard label="Département le plus impacté" value="IT" />
            </Box>
          </Box>
    </Paper>
  );
};
