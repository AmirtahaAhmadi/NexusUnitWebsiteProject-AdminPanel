import apiClient from "../../interceptor";

export const createBuilding = async (data) => {
  return await apiClient.post(`/Building`, data);
};
