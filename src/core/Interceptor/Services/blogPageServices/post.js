import apiClient from "../../interceptor";


export const createNews = ({
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

  return apiClient.post("/News/CreateNews", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};