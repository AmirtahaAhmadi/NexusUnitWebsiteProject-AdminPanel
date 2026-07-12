import apiClient from "../interceptor";

export const getjobByid = (Id) => {
  return apiClient.get(`/AssistanceWork/${Id}`);
};
