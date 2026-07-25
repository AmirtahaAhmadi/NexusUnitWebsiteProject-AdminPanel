import apiClient from "../../interceptor";

export const getUserProfileInfo = async () => {
  const response = await apiClient.get("/SharePanel/GetProfileInfo");
  console.log("پروفایل کاربر:", response.data);
  return response;
};

export const getMyCourses = async () => {
  const response = await apiClient.get("/SharePanel/GetMyCourses");
  console.log("دوره‌های من:", response.data);
  return response;
};

export const getMyCoursesReserve = async () => {
  const response = await apiClient.get("/SharePanel/GetMyCoursesReserve");
  console.log("رزروهای دوره من:", response.data);
  return response;
};

export const getMyFavoriteCourses = async () => {
  const response = await apiClient.get("/SharePanel/GetMyFavoriteCourses");
  console.log("دوره‌های علاقه‌مندی من:", response.data);
  return response;
};

export const getMyFavoriteNews = async () => {
  const response = await apiClient.get("/SharePanel/GetMyFavoriteNews");
  console.log("اخبار علاقه‌مندی من:", response.data);
  return response;
};

export const getMyCoursesComments = async () => {
  const response = await apiClient.get("/SharePanel/GetMyCoursesComments");
  console.log("نظرات دوره‌های من:", response.data);
  return response;
};

export const getMyJobHistories = async () => {
  const response = await apiClient.get("/SharePanel/GetMyJobHistories");
  console.log("تاریخچه‌های شغلی من:", response.data);
  return response;
};

export const getCourseList = async () => {
  const response = await apiClient.get("/Course/CourseList");
  console.log("لیست دوره‌ها:", response.data);
  return response;
};

export const getCourseUserList = async () => {
  const response = await apiClient.get("/CourseUser/GetCourseUserList");
  console.log("لیست کاربران دوره:", response.data);
  return response;
};