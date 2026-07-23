import apiClient from "../interceptor";

export const getCourseGroupDetailsCall = async (id) => {
  try {
    const response = await apiClient.get(`/CourseGroup/Details`, {
      params: { Id: id },
    });
    return response;
  } catch (error) {
    console.error("Error fetching course group details:", error);
    throw error;
  }
};
