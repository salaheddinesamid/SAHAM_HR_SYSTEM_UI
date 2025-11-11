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
      name: "Demandes administratives",
      icon: <FaCalendarAlt />,
      view: <></>,
      subServices: [
        { id: 1, name: "Congés", view: <LeaveRequest /> },
        { id: 2, name: "Documents administratives", view: <DocumentRequest/> },
        { id: 5, name: "Mes Bulletins", view: <></> },
        {id: 3, name: "Prêts / Avances", view: <Loan/>},
        {id: 4, name: "Support RH", view: <></>}
        
      ],
    },
    {
        id: 3, name: "SAHAM Annuaire", icon: <></>, view: <Annuaire/>
    },
    { id: 4, label: "Les bons plans Saham", name: "Les bons plans Saham", icon: <Gift /> },
  { id: 5, label: "Infos médicales et d'urgence", name: "Infos médicales et d'urgence", icon: <HeartPulse /> },
  { id: 6, label: "Mes remboursements médicaux", name: "Mes remboursements médicaux", icon: <Activity /> },
  { id: 7, label: "Mes dépenses", name: "Mes dépenses", icon: <Wallet /> },
  { id: 8, label: "Talent Acquisition", name: "Talent Acquisition", icon: <UserRoundSearch /> },
  { id: 9, label: "Onboarding", name: "Onboarding", icon: <Handshake /> },
  { id: 10, label: "Amélioration continue", name: "Amélioration continue", icon: <RefreshCcw /> },
  { id: 11, label: "SAHAM News", name: "SAHAM News", icon: <Rss /> }
];
export const homeCards = [
  { id: "leave", label: "Demandes de congé", name:"Congés", icon: <FileText />,
    view: <LeaveRequest /> },
  { id: "loan", label: "Demandes de prêt", name: "Prêts / Avances", icon: <Wallet />,  view:<Loan/> },
  { id: "advance", label: "Demandes d’avance", name: "Prêts / Avances", icon: <Briefcase/>, view: <Loan/> },
  { id: "plans", label: "Les bons plans Saham", name: "Les bons plans Saham", icon: <Gift /> },
  { id: "health", label: "Infos médicales et d'urgence", name: "Infos médicales et d'urgence", icon: <HeartPulse /> },
  { id: "refunds", label: "Mes remboursements médicaux", name: "Mes remboursements médicaux", icon: <Activity /> },
  { id: "expenses", label: "Mes dépenses", name: "Mes dépenses", icon: <Wallet /> },
  { id: "talentAqcuisition", label: "Talent Acquisition", name: "Talent Acquisition", icon: <UserRoundSearch /> },
  { id: "onboarding", label: "Onboarding", icon: <Handshake /> },
  { id: "continuousImprovement", label: "Amélioration continue", icon: <RefreshCcw /> },
  { id: "news", label: "SAHAM News", icon: <Rss /> },
  { id: "news", label: "SAHAM Annuaire", icon: <Network />, view: <Annuaire/> },
];