import apiClient from "../interceptor";

export const GetTeachers = () => {
  return apiClient.get("/Home/GetTeachers");
};
