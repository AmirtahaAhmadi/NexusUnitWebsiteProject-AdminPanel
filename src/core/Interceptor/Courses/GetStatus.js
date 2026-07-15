import apiClient from "../interceptor";

export const GetStatus = () => {
  return apiClient.get("/Status");
};
