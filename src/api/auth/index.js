import { axiosInstance } from "../../utils/AxiosInstance";
// import { API_BASE_URL } from "../../config/Config";
export const signIn = async (data)=>{

    const URL = '/mba/api/v1/auth/signin';
    try{
    const response = await axiosInstance.post(URL, data);
    console.log(response);
    return response;
    }
    catch(error){
        console.log(error);
        return error.response;
    }
}

export const signUp = async (data) => {
  const URL = "/mba/api/v1/auth/signup";

  try { 
    const response = await axiosInstance.post(URL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};