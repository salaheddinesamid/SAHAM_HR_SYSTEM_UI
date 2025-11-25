import axios from "axios";

export const AbsenceAPI = axios.create({
    baseURL : `${process.env.REACT_APP_SERVER_URL}/api/v1/absences`
})