import apiClient from "../../interceptor";

export const getDepartments = () => {
  return apiClient.get("/Department");
};

export const getDepartmentById = (id) => {
  return apiClient.get(`/Department/${id}`);
};
