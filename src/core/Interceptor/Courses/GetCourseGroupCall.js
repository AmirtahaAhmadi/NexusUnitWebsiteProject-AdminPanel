import apiClient from "../interceptor";

export const getCourseGroupsCall = async ({
  pageNumber = 1,
  rowsOfPage = 10,
  sortingCol = "DESC",
  sortType = "Expire",
  query = "",
}) => {
  try {
    const response = await apiClient.get("/CourseGroup", {
      params: {
        PageNumber: pageNumber,
        RowsOfPage: rowsOfPage,
        SortingCol: sortingCol,
        SortType: sortType,
        Query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching course groups:", error);
    throw error;
  }
};
