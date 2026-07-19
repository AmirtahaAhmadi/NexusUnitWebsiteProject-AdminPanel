import apiClient from "../../interceptor";

export const updateDepartment = (data) => {
  return apiClient.put("/Department", data);
};