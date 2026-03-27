import { AnalyticsAPI } from "../apis/AnalyticsAPI"
/**
 * 
 * @param {*} department 
 * @param {*} entity 
 * @returns 
 */
export const getEmployeeAnlayticsOverview = async(department, entity) =>{
    const response = await AnalyticsAPI.get("/employees/overview", {
        params : {
            department : department,
            entity : entity
        }
    });
    return response.data;
}
/**
 * 
 * @param {*} type 
 * @param {*} from 
 * @param {*} to 
 * @param {*} department 
 * @param {*} entity 
 * @returns 
 */
export const getLeaveAnalyticsOverview = async(type, from, to, department, entity) =>{
    const response = await AnalyticsAPI.get("leaves/overview", {
        params : {
            type : type,
            entity : entity,
            from : from,
            to : to,
            department : department
        }
    });
    return response.data;
}
/**
 * 
 * @param {*} type 
 * @param {*} from 
 * @param {*} to 
 * @param {*} department 
 * @param {*} entity 
 * @returns 
 */
export const getAbsenceAnalyticsOverview = async(type, from, to, department, entity) =>{
    const response = await AnalyticsAPI.get("absences/overview", {
        params : {
            type : type,
            entity : entity,
            from : from,
            to : to,
            department : department
        }
    });
    return response.data;
}
/**
 * 
 * @param {*} year 
 */
export const getExpenseAnalyticsOverview = async(year) =>{
    const response = await AnalyticsAPI.get("/expenses/overview",{
        params : {
            year : year
        }
    });
    return response.data;
}