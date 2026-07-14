import apiClient from "../interceptor";

export const GetAllTechnology = () => {
  return apiClient.get("/Technology");
};
