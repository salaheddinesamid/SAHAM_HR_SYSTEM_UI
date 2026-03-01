import { AnalyticsAPI } from "../apis/AnalyticsAPI"

export const getEmployeeAnlayticsOverview = async(department, entity)=>{
    const response = await AnalyticsAPI.get("/employees/overview", {
        params : {
            department : department,
            entity : entity
        }
    });
    return response.data;
}

export const getLeaveAnalyticsOverview = async(type, from, to, department, entity)=>{
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

export const getAbsenceAnalyticsOverview = async(type, from, to, department, entity)=>{
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