import apiClient from "../interceptor";

export const CreatCourseStep3 = (data) => {
  return apiClient.post(
    `/Course/AddCourseTechnology?courseId=${data.id}`,
    data.techid.map((id) => ({
      techId: id,
    })),
  );
};
