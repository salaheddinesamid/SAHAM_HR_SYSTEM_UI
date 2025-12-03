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

// Calculate total leave days excluding weekends
export const totalLeaveDaysCalculator = (from, to) => {
  const start = new Date(from);
  const end = new Date(to);

  // Validation
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  if (start > end) return 0;

  let current = new Date(start);
  let totalDays = 0;

  while (current <= end) {
    const day = current.getDay(); 
    // getDay(): 0=Sunday, 6=Saturday

    if (day !== 0 && day !== 6) {  // Exclude Saturday (6) & Sunday (0)
      totalDays++;
    }

    current.setDate(current.getDate() + 1);
  }

  return totalDays -1;
};

