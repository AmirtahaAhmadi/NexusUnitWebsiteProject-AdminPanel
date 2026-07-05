import apiClient from "../../interceptor";

/**
 * ایجاد خبر جدید.
 * طبق مستندات واقعی Postman برای POST /News/CreateNews:
 *   - بدنه باید multipart/form-data باشد (نه JSON)
 *   - اسم فیلدها PascalCase است: Title, GoogleTitle, GoogleDescribe,
 *     MiniDescribe, Describe, Keyword, IsSlider, NewsCatregoryId, Image
 *   - دسته‌بندی فقط یک شناسه‌ی عددی است (تک‌انتخابی)، نه آرایه
 *
 * payload ورودی این تابع camelCase است تا با بقیه‌ی کد React هماهنگ
 * بماند؛ خودِ تابع تبدیل به فرمت مورد نیاز سرور را انجام می‌دهد.
 */
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