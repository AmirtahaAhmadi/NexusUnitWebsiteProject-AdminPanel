import apiClient from "../../interceptor";

export const updateBuilding = async (data) => {
  return await apiClient.put(`/Building`, data);
};

export const setBuildingActive = async (data) => {
  return await apiClient.put(`/Building/Active`, data);
};
