import { Box, Paper, TextField, Typography } from "@mui/material";
import { StatCard } from "./StatCard";

import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from "react";
import { getLeaveAnalyticsOverview } from "../../../services/AnalyticsService";

const data = [
  { label: 'Congés Annuel', value: 400, color: '#0088FE' },
  { label: 'Congés Exceptionnel', value: 300, color: '#00C49F' }
];

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function DonutChart({data}) {
  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
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
export const LeaveAnalytics = () => {

  const [data, setData] = useState({});
  const [chartData, setChartData] = useState([
    { label: 'Congés Annuel', value: 0, color: '#0088FE' },
    { label: 'Congés Exceptionnel', value: 0, color: '#00C49F' }
  ])
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
      const res = await getLeaveAnalyticsOverview(type, from, to, department, entity)
      setData(res); // update the data
      setChartData((prev)=>[
        {...prev[0], value : res?.totalAnnualLeaveRequests},
        {...prev[1], value : res?.totalExceptionalLeaveRequests},
      ])
      console.log("Current entity: ", currentEntity);
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
      <Box mb={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}>
        <Box>
           <Typography variant="h4" fontWeight={700} color="#004170">
            Analyse des congés
          </Typography>
          
          <Typography color="text.secondary">
            Statistiques d’utilisation et de gestion des congés
          </Typography>
        </Box>
        <Box sx={{
          display : "flex",
          justifyContent : "space-between"
        }}>
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
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
        gap={4}
        alignItems="center"
      >
        <DonutChart data={chartData}/>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)" }}
          gap={3}
        >
          <StatCard label="Total congés demandés" value={data?.totalRequests || 0} />
          <StatCard label="Congés approuvés" value={data?.totalApprovedLeaves || 0} />
          <StatCard label="Congés rejetés" value={data?.totalRejectedLeaves || 0} />
          <StatCard label="Demandes en attente" value={data?.totalPendingLeaveRequests || 0 } />
          <StatCard label="Solde moyen restant" value={`${data?.leaveDaysRate || 0} jours`} /> 
        </Box>
      </Box>
    </Paper>
  );
};
