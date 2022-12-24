import { axiosInstance } from "../../utils/AxiosInstance";

export const getAllMovies = async () => {
  const URL = "/mba/api/v1/auth/movies";

  try {
    const response = await axiosInstance.post(URL);
       return response;
  } catch (error) {
        return error.response;
  }
};


