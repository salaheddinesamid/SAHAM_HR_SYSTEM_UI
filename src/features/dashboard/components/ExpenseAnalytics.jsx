import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { StatCard } from "./StatCard";
import { useEffect, useState } from "react";
import { getExpenseAnalyticsOverview } from "../../../services/AnalyticsService";
import BarsDataset from "./BarDataset";
import { generateYears } from "../../payrolls/utils/YearsGeneratror";
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
export const ExpenseAnalytics = () =>{

    const years = generateYears(2010, new Date().getFullYear);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [dataSet, setDataSet] = useState([]);
    const [overviewData, setOverviewData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState("ALL");
    const [currentEntity, setCurrentEntity] = useState("ALL");

    const fetchData = async(year) =>{
        try{
            setLoading(true);
            const res = await getExpenseAnalyticsOverview(year)
            setDataSet(res);
            console.log(res);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData(selectedYear);
    }, [])
    return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        marginTop : 5,
        background: "linear-gradient(145deg,#ffffff,#f4f7fb)",
        boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
      }}
    >
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700} color="#004170">
          Analyse des dépenses
        </Typography>

        <Typography color="text.secondary">
          Indicateurs clés sur l’absentéisme des collaborateurs
        </Typography>
      </Box>

      {loading && dataSet.length === 0 && (
        <CircularProgress/>
      )}

      {!loading && dataSet.length === 0 && (
        <p>Aucune donnée de dépense disponible</p>
      )}
      <Box
        display="inline"
        gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
        gap={4}
        alignItems="center"
      >
        <Box sx={{
                      display : "flex",
                      justifyContent : "space-between"
                    }}>
                      <select name="" id="" value={selectedYear} onChange={(e)=> setSelectedYear(e.target.value)}>
                            <option value="">Filtrer par département</option>
                            {departments.map((e)=>(
                                <option value={e.value} key={e.id}>{e.label}</option>
                            ))}
                        </select>
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
        <BarsDataset data={dataSet}/>

        
      </Box>
    </Paper>
  );
}