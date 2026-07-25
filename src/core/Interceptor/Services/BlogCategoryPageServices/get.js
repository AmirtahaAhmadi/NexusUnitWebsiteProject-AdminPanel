import apiClient from "../../interceptor";

export const getNewsCategory = async (id) => {
  return await apiClient.get(
    `/News/GetNewsCategory/${id}`
  );
};
export const getNewsWithCategory = async (id) => {
  return await apiClient.get(
    `/News/GetNewsWithCategory/${id}`
  );
};