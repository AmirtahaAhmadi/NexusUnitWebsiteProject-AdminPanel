import apiClient from "../interceptor";

export const ActiveDeactiveCourse = (data) => {
  return apiClient.put("/Course/ActiveAndDeactiveCourse", {
    active: data.active,
    id: data.id,
  });
};
