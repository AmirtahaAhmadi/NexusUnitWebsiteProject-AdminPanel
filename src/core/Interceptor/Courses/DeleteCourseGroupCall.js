import apiClient from "../interceptor";

export const deleteCourseGroupCall = async (groupId) => {
  try {
    const response = await apiClient.delete("/CourseGroup", {
      data: { id: groupId },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting course group:", error);
    throw error;
  }
};
