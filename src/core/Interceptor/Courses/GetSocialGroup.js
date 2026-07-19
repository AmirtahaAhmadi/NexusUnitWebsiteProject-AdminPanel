import apiClient from "../interceptor";

export const GetSocialGroup = () => {
  return apiClient.get("/CourseSocialGroup");
};
