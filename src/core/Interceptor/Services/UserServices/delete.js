import apiClient from "../../interceptor";

export const deleteUser = (userId) => {
  return apiClient.delete("/User/DeleteUser", {
    userId: userId,
  });
};

export const deleteCourseReserve = (id) => {
  return apiClient.delete("/CourseReserve", {
    data: {
      id: id,
    },
  });
};
