import apiClient from "../interceptor";

export const GetCourselevel = () => {
  return apiClient.get("/CourseLevel/GetAllCourseLevel");
};
