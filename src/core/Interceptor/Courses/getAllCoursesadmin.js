import apiClient from "../interceptor";

export const getAllCoursesadmin = (
  pageNumber,
  rowsOfPage,
  SortingCol,
  SortType,
  Query,
) => {
  return apiClient.get("/Course/CourseList", {
    params: {
      PageNumber: pageNumber,
      RowsOfPage: rowsOfPage,
      SortingCol: SortingCol,
      SortType: SortType,
      Query: Query,
    },
  });
};
