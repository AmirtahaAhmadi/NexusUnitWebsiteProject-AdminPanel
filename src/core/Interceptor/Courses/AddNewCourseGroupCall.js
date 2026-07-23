import apiClient from "../interceptor";

export const AddNewCourseGroupCall = async (groupData) => {
  try {
    const formData = new FormData();
    formData.append("GroupName", groupData.GroupName);
    formData.append("CourseId", groupData.CourseId);
    formData.append("GroupCapacity", groupData.GroupCapacity);

    const response = await apiClient.post("/CourseGroup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("خطا در ایجاد گروه:", error);
    throw error;
  }
};
