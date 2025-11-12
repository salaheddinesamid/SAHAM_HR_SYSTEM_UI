import { 
  Activity, 
  Briefcase, 
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
import { Loan } from "./Loan";
import { DocumentRequest } from "./DocumentRequest";
import { Home } from "./Home";
import { LeaveRequest } from "./Leave";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { Annuaire } from "./Directory";

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
      { id: 1, name: "Congés & Absences", view: <LeaveRequest />, icon: <FileText />, color: "#E3F2FD" },
      { id: 2, name: "Attestations & Documents", view: <DocumentRequest/>, color: "#E3F2FD" },
      { id: 5, name: "Bulletins de paie", view: <></>, color: "#E3F2FD" },
      { id: 3, name: "Prêts", view: <Loan/>, icon: <Wallet />, color: "#E3F2FD" },
      { id: 4, name: "Guide RH", view: <></>, icon: <Info />, color: "#E3F2FD" },
      { id: 7, name: "Mes dépenses", icon: <Wallet />, color: "#E3F2FD" },
    ],
  },
  {
    id: 3, 
    name: "Vie au Bureau", 
    view: <></>,
    color: "#FFF3E0", // Warm orange
    subServices: [
      { id: 1, name: "Les bons plans Saham", icon: <Gift />, color: "#FFF3E0" },
      { id: 2, name: "Annuaire", icon: <Network />, color: "#FFF3E0" },
      { id: 3, name: "Guide Collaborateur", color: "#FFF3E0" },
      { id: 4, name: "Tribus", color: "#FFF3E0" },
      { id: 5, name: "Evénements SAHAM", color: "#FFF3E0" },
    ],
  },
  {
    id: 4, 
    name: "Santé & avantages", 
    view: <></>,
    color: "#E8F5E9", // Light green
    subServices: [
      { id: 1, name: "Infos médicales & d’urgence", icon: <HeartPulse />, color: "#E8F5E9" },
      { id: 2, name: "Mes remboursements médicaux", icon: <Activity />, color: "#E8F5E9" },
      { id: 3, name: "Conventions & Tiers Payant", color: "#E8F5E9" },
      { id: 4, name: "Campagne de Vaccination", icon: <Syringe />, color: "#E8F5E9" },
    ],
  },
  {
    id: 5, 
    name: "Développement RH", 
    view: <></>,
    color: "#F3E5F5", // Light lavender
    subServices: [
      { id: 1, name: "Recrutement", color: "#F3E5F5" },
      { id: 2, name: "Onboarding", icon: <Handshake />, color: "#F3E5F5" },
      { id: 3, name: "Performance", icon: <UserStar />, color: "#F3E5F5" },
      { id: 4, name: "Formation", icon: <GraduationCap />, color: "#F3E5F5" },
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
