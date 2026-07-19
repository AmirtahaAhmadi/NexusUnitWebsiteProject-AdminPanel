import apiClient from "../interceptor";

export const Getallassistancework = () => {
  return apiClient.get("/AssistanceWork");
};
