export const LeaveTypesMapper = (status)=>{
    switch(status){
        case "ANNUAL":
            return "Congé Annuel"
        case "EXCEPTIONAL":
            return "Congé Exceptionnel"
    }
}

export const dateFormatter = (date) => new Date(date).toISOString().split("T")[0];
