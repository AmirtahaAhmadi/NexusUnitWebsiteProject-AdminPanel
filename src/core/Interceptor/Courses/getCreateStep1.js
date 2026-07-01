import apiClient from "../interceptor";

export const getCourseCreateData = () => {
  return apiClient.get("/Course/GetCreate");
};
