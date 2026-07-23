import apiClient from "../interceptor";

export const updateCourseGroupCall = async (data) => {
  try {
    const formData = new FormData();
    formData.append("Id", data.id);
    formData.append("GroupName", data.groupName);
    formData.append("CourseId", data.courseId);
    formData.append("GroupCapacity", data.groupCapacity);

    const response = await apiClient.put("/CourseGroup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateCourseGroup API call:", error);
    throw error;
  }
};
