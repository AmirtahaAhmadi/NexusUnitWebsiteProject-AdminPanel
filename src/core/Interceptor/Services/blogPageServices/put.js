import apiClient from "../../interceptor";

export const activeDeactiveNews = async (id, active) => {
  return await apiClient.put("/News/ActiveDeactiveNews", {
    id,
    active,
  });
};
