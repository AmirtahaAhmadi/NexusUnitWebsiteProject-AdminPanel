import apiClient from "../interceptor";

export const CreatecourseLevel = (data) => {
  return apiClient.post("/CourseLevel", {
    id: data.id,
    levelName: data.levelName,
  });
};
