import { FileStorageAPI } from "../apis/FileStorageAPI"

export const downloadFile = async(path)=>{
    const response = await FileStorageAPI.get("download",{
        params : {
            filePath : path
        }
    });

    return response.data;
}