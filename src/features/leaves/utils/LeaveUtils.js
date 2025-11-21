
export const LeaveTypesMapper = (status)=>{
    switch(status){
        case "ANNUAL":
            return "Congé Annuel"
        case "EXCEPTIONAL":
            return "Congé Exceptionnel"
    }
}