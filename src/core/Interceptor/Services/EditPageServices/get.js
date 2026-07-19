import apiClient from "../../interceptor";

export const getNewsById = (id) => {
  return apiClient.get(`/News/${id}`);
};

export const getListNewsCategory = () => {
  return apiClient.get("/News/GetListNewsCategory");
};

export const getNewsFileList = (newsId) => {
  return apiClient.get("/News/GetNewsFileList", {
    params: { NewsId: newsId },
  });
};