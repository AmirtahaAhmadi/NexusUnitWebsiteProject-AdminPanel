import apiClient from "../../interceptor";

export const getCourseAssistances = async () => {
  return await apiClient.get(`/CourseAssistance`);
};

export const getCourseAssistanceById = async (id) => {
  return await apiClient.get(`/CourseAssistance/${id}`);
};

export const getCoursesWithPagination = async ({
  TeacherId,
  RowsOfPage = 100,
  PageNumber = 1,
} = {}) => {
  return await apiClient.get("/Home/GetCoursesWithPagination", {
    params: {
      TeacherId,
      RowsOfPage,
      PageNumber,
    },
  });
};

export const getTeachers = async () => {
  return await apiClient.get(`/Home/GetTeachers`);
};