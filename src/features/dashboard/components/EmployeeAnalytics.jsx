import { Paper, Box, Typography, Select, MenuItem } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { getEmployeeAnlayticsOverview } from "../../../services/AnalyticsService";

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
export const EmployeeAnalytics = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // Filters by department and entity
    const [currentDepartment, setCurrentDepartment] = useState("ALL");
    const [currentEntity, setCurrentEntity] = useState("ALL");

    const handleDepartmentFilterChange = (e) =>{
        setCurrentDepartment(e.target.value);
    }
    const handleEntityFilterChange = (e) =>{
        setCurrentEntity(e.target.value);
    }

    const fetchData = async(department, entity)=>{
        try{
            setLoading(true);
            const res  = await getEmployeeAnlayticsOverview(department, entity);
            setData(res);
            console.log(res);
        }catch(err){
            console.log(err);
            setError(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData(currentDepartment, currentEntity)
    },[currentDepartment, currentEntity])
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
      <Box
      mb={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}>
        <Box>
            <Typography variant="h4" fontWeight={700} color="#004170">
                Collaborateurs
            </Typography>
            
            <Typography color="text.secondary">
                Aperçu statistique de la population interne
            </Typography>
        </Box>
        <Box>
            <select name="" id="" value={currentDepartment} onChange={handleDepartmentFilterChange}>
                <option value="">Filtrer par département</option>
                {departments.map((e)=>(
                    <option value={e.value} key={e.id}>{e.label}</option>
                ))}
            </select>
            <select name="" id="" value={currentEntity} onChange={handleEntityFilterChange}>
                <option value="">Filtrer par entité</option>
                {entities.map((e)=>(
                    <option value={e.value} key={e.id}>{e.label}</option>
                ))}
            </select>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          md: "repeat(3, 1fr)",
        }}
        gap={3}
      >
        <StatCard
          icon={<PeopleAltIcon />}
          label="Effectif total"
          value={data?.totalEmployees}
        />

        <StatCard
          icon={<MaleIcon />}
          label="Nombre d’hommes"
          value={data?.totalMaleEmployees}
        />

        <StatCard
          icon={<FemaleIcon />}
          label="Nombre de femmes"
          value={data?.totalFemaleEmployees}
        />
      </Box>
    </Paper>
  );
};
