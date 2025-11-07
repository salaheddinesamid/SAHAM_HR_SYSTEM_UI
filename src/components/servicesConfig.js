import { Activity, Briefcase, FileText, Gift, Handshake, HeartPulse, Network, RefreshCcw, Rss, UserRoundSearch, Wallet } from "lucide-react";
import { Loan } from "./Loan";
import { DocumentRequest } from "./DocumentRequest";
import { Home } from "./Home";
import { LeaveRequest } from "./Leave";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { Annuaire } from "./Directory";

export const servicesConfig = [
  { id: 1, name: "Home", icon: <FaHome />, view: <Home/> },
    {
      id: 2,
      name: "Demandes administratifs",
      icon: <FaCalendarAlt />,
      view: <></>,
      subServices: [
        { id: 1, name: "Congés", view: <LeaveRequest /> },
        { id: 2, name: "Documents administratifs", view: <DocumentRequest/> },
        {id: 3, name: "Prêts / Avances", view: <Loan/>}
        
      ],
    },
    {
        id: 3, name: "SAHAM Annuaire", icon: <></>, view: <Annuaire/>
    }
];
export const homeCards = [
  { id: "leave", label: "Demandes de congé", name:"Congés", icon: <FileText />,
    view: <LeaveRequest /> },
  { id: "loan", label: "Demandes de prêt", icon: <Wallet /> },
  { id: "advance", label: "Demandes d’avance", icon: <Briefcase /> },
  { id: "plans", label: "Les bons plans Saham", icon: <Gift /> },
  { id: "health", label: "Infos médicales et d'urgence", icon: <HeartPulse /> },
  { id: "refunds", label: "Mes remboursements médicaux", icon: <Activity /> },
  { id: "expenses", label: "Mes dépenses", icon: <Wallet /> },
  { id: "talentAqcuisition", label: "Talent Acquisition", icon: <UserRoundSearch /> },
  { id: "onboarding", label: "Onboarding", icon: <Handshake /> },
  { id: "continuousImprovement", label: "Amélioration continue", icon: <RefreshCcw /> },
  { id: "news", label: "SAHAM News", icon: <Rss /> },
  { id: "news", label: "SAHAM Annuaire", icon: <Network />, view: <Annuaire/> },
];