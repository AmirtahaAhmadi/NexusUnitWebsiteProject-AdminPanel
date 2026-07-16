import apiClient from "../../interceptor";

export const getSocialGroups = async () => {
  return await apiClient.get(`/CourseSocialGroup`);
};

export const getSocialGroupById = async (id) => {
  return await apiClient.get(`/CourseSocialGroup/${id}`);
};

export const getCoursesWithPagination = async ({
  TeacherId,
  RowsOfPage = 100,
  PageNumber = 1,
} = {}) => {
  return await apiClient.get("/Home/GetCoursesWithPagination", {
    params: {
      TeacherId,
      RowsOfPage,
      PageNumber,
    },
  });
};