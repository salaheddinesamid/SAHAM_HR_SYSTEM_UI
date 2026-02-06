import { 
  Activity, 
  ChartNoAxesCombined, 
  FileText, 
  Folders, 
  Gift, 
  GraduationCap, 
  HandCoins, 
  Handshake, 
  HeartPulse, 
  Info, 
  Network, 
  Syringe, 
  UserStar, 
  Wallet 
} from "lucide-react";
import { DocumentRequest } from "../features/documents/Main";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Home } from "./Home";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { Annuaire } from "./Directory";
import { Expenses } from "../features/expenses/Expenses";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { Loan } from "../features/loans/Main";
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import PaymentsIcon from '@mui/icons-material/Payments';
import RouteIcon from '@mui/icons-material/Route';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { ProfileManagement } from "../features/profile/ProfileManagement";
import { AnalyticsDashboard } from "../features/dashboard/AnalyticsDashboard";
import { EmployeePayrolls } from "../features/payrolls/Payrolls";
import { LeavesAndAbsences } from "../features/leaves_and_absences/Main";
import { HrGuide } from "../features/guides/hr/Main";
import { EmployeeGuide } from "../features/guides/employee/Main";
import { CarInsuranceDetails } from "../features/advantages/insurance/Main";
import { HomeInsuranceDetails } from "../features/advantages/home/Main";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { GreenCardDetails } from "../features/advantages/green_card/Main";
import Groups2Icon from '@mui/icons-material/Groups2';
import MenuBookIcon from '@mui/icons-material/MenuBook';


export const servicesConfig = [
  { 
    id: 1, 
    name: "Home", 
    icon: <FaHome />, 
    view: <Home/>, 
    color: "#F5F7FA"  // Light neutral gray-blue
  },
  {
    id : 10,
    name : "Profil",
    view : <ProfileManagement/>
  },
  {
    id: 2,
    name: "Demandes administratives",
    icon: <FaCalendarAlt />,
    view: <></>,
    color: "#E3F2FD", // Light blue
    subServices: [
      { id: 1, name: "Congés & Absences", view: <LeavesAndAbsences />, icon: <GroupRemoveIcon />, color: "#E3F2FD" },
      { id: 2, name: "Attestations & Documents", view: <DocumentRequest/>, icon : <FileText/>, color: "#E3F2FD" },
      { id: 5, name: "Bulletins de paie", view: <EmployeePayrolls/>, icon : <PaymentsIcon/> , color: "#E3F2FD" },
      { id: 3, name: "Prêts", view: <Loan/>, icon: <RealEstateAgentIcon />, color: "#E3F2FD" },
      { id: 7, name: "Mes dépenses", view: <Expenses/> , icon: <Wallet />, color: "#E3F2FD" },
    ],
  },
  {
    id: 3, 
    name: "Vie au Bureau", 
    view: <></>,
    color: "#FFF3E0", // Warm orange
    subServices: [
      { id: 1, name: "Les bons plans Saham", icon: <Gift />, color: "#FFF3E0" },
      { id: 2, name: "Annuaire", icon: <Network />, color: "#FFF3E0", view:<Annuaire/> },
      { id: 3, name: "Guide Collaborateur", icon : <MenuBookIcon/> ,color: "#FFF3E0", view: <EmployeeGuide/>},
      { id: 4, name: "Guide RH", icon : <Folders/> ,color: "#FFF3E0", view: <HrGuide/>},
      { id: 5, name: "Tribus", color: "#FFF3E0", icon : <Groups2Icon/>},
      { id: 6, name: "Evénements SAHAM", icon : <CelebrationIcon/>, color: "#FFF3E0" },
    ],
  },
  {
    id: 4, 
    name: "Avantages & Assurances", 
    view: <></>,
    color: "#E8F5E9", // Light green
    subServices: [
      { id: 1, name: "Assurance Auto", icon: <CarCrashIcon />, color: "#E8F5E9", view: <CarInsuranceDetails/>},
      { id: 2, name: "Avantage Multirisque Habitation", icon: <MapsHomeWorkIcon />, color: "#E8F5E9", view: <HomeInsuranceDetails/>},
      { id: 3, name: "Avantage Carte Verte", icon: <CardGiftcardIcon />, color: "#E8F5E9", view : <GreenCardDetails/>},
      { id: 4, name: "Mes remboursements médicaux", icon: <AttachMoneyIcon />, color: "#E8F5E9" },
      { id: 5, name: "Conventions & Tiers Payant", icon: <HandCoins />, color: "#E8F5E9" },
      { id: 6, name: "Campagne de Vaccination", icon: <Syringe />, color: "#E8F5E9" },
      
    ],
  },
  {
    id: 5, 
    name: "Parcours Collaborateur", 
    view: <></>,
    color: "#F3E5F5", // Light lavender
    subServices: [
      { id: 1, name: "Identification et recrutement des talents", icon : <WorkHistoryIcon/>, color: "#F3E5F5" },
      { id: 2, name: "Pré-intégration", icon: <Handshake />, color: "#F3E5F5" },
      { id: 3, name: "Intégration (accueil, orientation et formation initiale)", icon: <UserStar />, color: "#F3E5F5" },
      { id: 5, name: "Rémunération et avantages sociaux", icon: <GraduationCap />, color: "#F3E5F5" },
      { id: 6, name: "Formation et développement continu", icon: <GraduationCap />, color: "#F3E5F5" },
      { id: 7, name: "Performance, feedback et évaluations", icon: <AssessmentIcon />, color: "#F3E5F5" },
      { id: 8, name: "Départ à la retraite, fin de contrat ou démission", icon: <ExitToAppIcon />, color: "#F3E5F5" },
    ],
  },
  {
    id: 6, 
    name: "Dashboard", 
    view: <></>,
    color: "#E0F7FA", // Light cyan
    subServices: [
      { id: 1, name: "Dashboard RH", icon: <ChartNoAxesCombined />, color: "#E0F7FA" , view: <AnalyticsDashboard/>},
    ],
  }
];
