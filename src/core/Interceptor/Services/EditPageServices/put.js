import apiClient from "../../interceptor";

export const updateNews = ({
  id,
  title,
  googleTitle,
  googleDescribe,
  miniDescribe,
  describe,
  keyword,
  isSlider,
  newsCategoryId,
  image,
}) => {
  const formData = new FormData();
  formData.append("Id", id);
  formData.append("Title", title ?? "");
  formData.append("GoogleTitle", googleTitle ?? "");
  formData.append("GoogleDescribe", googleDescribe ?? "");
  formData.append("MiniDescribe", miniDescribe ?? "");
  formData.append("Describe", describe ?? "");
  formData.append("Keyword", keyword ?? "");
  formData.append("IsSlider", isSlider ? "true" : "false");

  if (newsCategoryId !== undefined && newsCategoryId !== null) {
    formData.append("NewsCatregoryId", newsCategoryId);
  }

  if (image) {
    formData.append("Image", image);
  }

  return apiClient.put("/News/UpdateNews", formData);
};

export const updateNewsFile = (fileId, newsId, file) => {
  const formData = new FormData();
  formData.append("Id", fileId);
  formData.append("NewsId", newsId);
  formData.append("File", file);

  return apiClient.put("/News/UpdateNewsFile", formData);
};

export const activeDeactiveNews = (newsId, isActive) => {
  return apiClient.put("/News/ActiveDeactiveNews", {
    newsId,
    isActive,
  });
};