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