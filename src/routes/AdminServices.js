import { EmployeeManagementTable } from "../features/admin/components/EmployeeManagementTable";
import { HolidaysManagement } from "../features/admin/components/HolidaysManagement";
import { PayrollManagement } from "../features/admin/components/PayrollManagement";

export const adminServices = [
    { id : 1, name : "Gestion des collaborateurs", view: <EmployeeManagementTable/>},
    { id : 2, name : "Gestion des jours feriés", view: <HolidaysManagement/>},
    { id : 3, name : "Gestion des Bulletin de paie ", view : <PayrollManagement/>}
];