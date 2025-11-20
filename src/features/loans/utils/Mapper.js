export const loanStatusMapper = (status) => {
    switch (status) {
        case "APPROVED":
            return { message: "Approuvée", color: "bg-success" };
            
        case "REJECTED":
            return { message: "Rejetée", color: "bg-danger" };
            
        case "IN_PROCESS":
            return { message: "En attente", color: "bg-warning text-dark" };
            
        case "CANCELLED":
            return { message: "Annulée", color: "bg-secondary" };
        default:
            return { message: "Inconnue", color: "bg-light text-dark" };
        }
    };

export const loanTypeMapper = (type)=>{
    switch(type){
        case "NORMAL":
            return "Prêt"
        case "ADVANCE":
            return "Avance"
    }
}

export const loanAmountMapper = (amount)=>{
    return amount?.toLocaleString('fr-FR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })
}