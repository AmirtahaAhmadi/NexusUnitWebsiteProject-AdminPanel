import apiClient from "../../interceptor";


export const createCourseAssistance = async ({ courseId, userId }) => {
  return await apiClient.post(`/CourseAssistance`, {
    courseId,
    userId,
  });
};

export const updateCourseAssistance = async ({ courseId, userId, id }) => {
  return await apiClient.put(`/CourseAssistance`, {
    courseId,
    userId,
    id,
  });
};