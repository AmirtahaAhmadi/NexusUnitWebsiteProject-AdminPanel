import apiClient from "../../interceptor";

export const getBuildings = async () => {
  return await apiClient.get(`/Building`);
};

export const getBuildingById = async (id) => {
  return await apiClient.get(`/Building/${id}`);
};
