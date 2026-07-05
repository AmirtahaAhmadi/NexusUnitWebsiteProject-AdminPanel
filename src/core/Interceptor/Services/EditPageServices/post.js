import apiClient from "../../interceptor";

export const createNewsFile = (newsId, file) => {
  const formData = new FormData();
  formData.append("NewsId", newsId);
  formData.append("File", file);

  return apiClient.post("/News/CreateNewsFile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const setUrlForNews = (newsId, url) => {
  return apiClient.post("/News/SetUrlForNews", {
    newsId,
    url,
  });
};