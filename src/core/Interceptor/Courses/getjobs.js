import apiClient from "../interceptor";

export const getjobs = () => {
  return apiClient.get("/AssistanceWork");
};
