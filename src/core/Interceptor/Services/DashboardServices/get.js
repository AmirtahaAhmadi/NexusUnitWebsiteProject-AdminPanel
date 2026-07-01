import apiClient from "../../interceptor";

export const getUserProfileInfo = () => {
  return apiClient.get("/SharePanel/GetProfileInfo");
};
