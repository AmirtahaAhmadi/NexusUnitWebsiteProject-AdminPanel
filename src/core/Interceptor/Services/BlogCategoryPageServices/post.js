import apiClient from "../../interceptor";

export const createNewsCategoryfilter = async (data) => {
  const formData = new FormData();

  formData.append("CategoryName", data.categoryName);
  formData.append("Image", data.image);
  formData.append("IconAddress", data.iconAddress);
  formData.append("IconName", data.iconName);
  formData.append("GoogleTitle", data.googleTitle);
  formData.append("GoogleDescribe", data.googleDescribe);

  return await apiClient.post(
    "/News/CreateNewsCategory",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};