import apiClient from "../../interceptor";

export const createSocialGroup = async (body) => {
  return await apiClient.post(`/CourseSocialGroup`, body);
};