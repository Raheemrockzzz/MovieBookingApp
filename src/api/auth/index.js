
import { axiosInstance } from "../../utils/AxiosInstance";

export const signIn = async (user) => {
  const URL = "mba/api/v1/auth/signin";

  try {
    const response = await axiosInstance.post(URL, user);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const signUp = async (user) => {
  const URL = "mba/api/v1/auth/signup";

  try {
    const response = await axiosInstance.post(URL, user);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const signOut = () => {
  localStorage.remoteItem("name");
  localStorage.remoteItem("email");
  localStorage.remoteItem("userTypes");
  localStorage.remoteItem("userId");
  localStorage.remoteItem("accessToken");
  localStorage.remoteItem("userStatus");
};
