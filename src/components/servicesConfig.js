import { 
  Activity, 
  ChartNoAxesCombined, 
  FileText, 
  Gift, 
  GraduationCap, 
  Handshake, 
  HeartPulse, 
  Info, 
  Network, 
  Syringe, 
  UserStar, 
  Wallet 
} from "lucide-react";
import { DocumentRequest } from "../features/documents/DocumentRequest";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Home } from "./Home";
import { LeaveRequest } from "../features/leaves/Leave";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { Annuaire } from "./Directory";
import { Expenses } from "../features/expenses/Expenses";
import { HRGuide } from "./HRGuide";
import { Loan } from "../features/loans/Loan";
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import PaymentsIcon from '@mui/icons-material/Payments';
import RouteIcon from '@mui/icons-material/Route';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

export const servicesConfig = [
  { 
    id: 1, 
    name: "Home", 
    icon: <FaHome />, 
    view: <Home/>, 
    color: "#F5F7FA"  // Light neutral gray-blue
  },
  {
    id: 2,
    name: "Demandes administratives",
    icon: <FaCalendarAlt />,
    view: <></>,
    color: "#E3F2FD", // Light blue
    subServices: [
      { id: 1, name: "Congés & Absences", view: <LeaveRequest />, icon: <GroupRemoveIcon />, color: "#E3F2FD" },
      { id: 2, name: "Attestations & Documents", view: <DocumentRequest/>, icon : <FileText/>, color: "#E3F2FD" },
      { id: 5, name: "Bulletins de paie", view: <></>, icon : <PaymentsIcon/> , color: "#E3F2FD" },
      { id: 3, name: "Prêts", view: <Loan/>, icon: <RealEstateAgentIcon />, color: "#E3F2FD" },
      { id: 4, name: "Guide RH", view: <HRGuide/>, icon: <Info />, color: "#E3F2FD" },
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
      { id: 3, name: "Guide Collaborateur", icon : <RouteIcon/> ,color: "#FFF3E0" },
      { id: 4, name: "Tribus", color: "#FFF3E0" },
      { id: 5, name: "Evénements SAHAM", icon : <CelebrationIcon/>, color: "#FFF3E0" },
    ],
  },
  {
    id: 4, 
    name: "Santé & avantages", 
    view: <></>,
    color: "#E8F5E9", // Light green
    subServices: [
      { id: 1, name: "Infos médicales & d’urgence", icon: <HeartPulse />, color: "#E8F5E9" },
      { id: 2, name: "Mes remboursements médicaux", icon: <AttachMoneyIcon />, color: "#E8F5E9" },
      { id: 3, name: "Conventions & Tiers Payant", color: "#E8F5E9" },
      { id: 4, name: "Campagne de Vaccination", icon: <Syringe />, color: "#E8F5E9" },
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
      { id: 1, name: "Dashboard RH", icon: <ChartNoAxesCombined />, color: "#E0F7FA" },
    ],
  }
];
