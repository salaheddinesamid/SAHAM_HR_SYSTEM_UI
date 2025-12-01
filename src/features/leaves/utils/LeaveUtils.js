export const LeaveTypesMapper = (status)=>{
    switch(status){
        case "ANNUAL":
            return "Congé Annuel"
        case "EXCEPTIONAL":
            return "Congé Exceptionnel"
    }
};


export const AbsenceTypesMapper = (status)=>{
    switch(status){
        case "SICKNESS":
            return "Absence Maladie"
        case "REMOTE_WORK":
            return "Télétravail"
    }
}

export const leaveStatusMapper = (status) => {
    switch (status) {
        case "APPROVED":
            return { message: "Approuvée", color: "bg-success" };
            
        case "REJECTED":
            return { message: "Rejetée", color: "bg-danger" };
            
        case "IN_PROCESS":
            return { message: "En attente", color: "bg-warning text-dark" };
            
        case "CANCELED":
            return { message: "Annulée", color: "bg-secondary" };
        default:
            return { message: "Inconnue", color: "bg-light text-dark" };
        }
};


export const dateFormatter = (date) => new Date(date).toISOString().split("T")[0];
