/**
 * 
 * @param {*} status 
 * @returns 
 */
export const mapPayrollStatus = (status)=>{
    switch (status){
        case 'EXECUTED':
            return {label : "Executé", bgColor : ""}
        case 'SUCCEED':
            return { label : "Réussie", bgColor : ""}
        case 'FAILED':
            return { label : "Échoué", bgColor : ""}
    }
}
/**
 * 
 * @param {*} date 
 * @returns 
 */
export const payrollDateParser = (date)=>{
    return date.split("-");
    //return {year : splitDate[0], month : splitDate[1], day : splitDate[2]};
}