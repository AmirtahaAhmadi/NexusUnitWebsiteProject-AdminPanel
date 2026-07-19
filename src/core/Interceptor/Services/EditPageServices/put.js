import apiClient from "../../interceptor";

export const updateNews = ({
  id,
  slideNumber = 0,
  currentImageAddress = "",
  currentImageAddressTumb = "",
  active = true,
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
  formData.append("SlideNumber", slideNumber);
  formData.append("CurrentImageAddress", currentImageAddress);
  formData.append("CurrentImageAddressTumb", currentImageAddressTumb);
  formData.append("Active", active ? "true" : "false");

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

  if (image instanceof File) {
    formData.append("Image", image);
  }

  return apiClient
    .put("/News/UpdateNews", formData)
    .then((res) => res)
    .catch((err) => {
      console.error("API ERROR (updateNews):", err?.response?.data ?? err);
      throw err;
    });
};

export const updateNewsFile = ({
  fileId,
  newsId,
  file,
  isSlide = false,
  selectForMainImage = true,
}) => {
  const formData = new FormData();

  formData.append("Id", fileId);
  formData.append("NewsId", newsId);
  formData.append("IsSlide", isSlide ? "true" : "false");
  formData.append("SelectForMainImage", selectForMainImage ? "true" : "false");

  if (file instanceof File) {
    formData.append("File", file);
  }

  return apiClient.put("/News/UpdateNewsFile", formData);
};
export const activeDeactiveNews = (id, active) => {
  return apiClient
    .put("/News/ActiveDeactiveNews", {
      id,
      active,
    })
    .catch((err) => {
      console.error(
        "API ERROR (activeDeactiveNews):",
        err?.response?.data ?? err,
      );
      throw err;
    });
};