import apiClient from "../../interceptor";

export const deleteCourseComment = (courseCommandId) => {
  return apiClient.delete("/Course/DeleteCourseComment", {
    params: {
      CourseCommandId: courseCommandId,
    },
  });
};
