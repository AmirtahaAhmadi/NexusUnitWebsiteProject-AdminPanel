import apiClient from "../../interceptor";

export const getNewsWidthPagination = ({
  RowsOfPage,
  pageNumber,
  Query,
  SortingCol,
  SortType,
  IsActive,
}) => {
  return apiClient.get("/News/AdminNewsFilterList", {
    params: {
      PageNumber: pageNumber,
      RowsOfPage: RowsOfPage,
      Query: Query,
      SortingCol: SortingCol,
      SortType: SortType,
      IsActive: IsActive,
    },
  });
};