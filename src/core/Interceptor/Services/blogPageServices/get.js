import apiClient from "../../interceptor";

export const getNewsWidthPagination = ({
  RowsOfPage,
  pageNumber,
  Query,
  SortingCol,
  SortType,
}) => {
  return apiClient.get("/News", {
    params: {
      RowsOfPage: RowsOfPage,
      pageNumber: pageNumber,
      Query: Query,
      SortingCol: SortingCol,
      SortType: SortType,
    },
  });
};
