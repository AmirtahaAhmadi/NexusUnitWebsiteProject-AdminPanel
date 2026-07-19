import apiClient from "../interceptor";

export const getcoursebyidAdminTeacher = (id) => {
  return apiClient.get(`/Course/${id}`);
};
