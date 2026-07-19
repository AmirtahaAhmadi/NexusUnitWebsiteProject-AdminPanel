import { getAllCoursesadmin } from "./getAllCoursesadmin";

export const getAllCoursesadmincall = async (
  pageNumber,
  rowsOfPage,
  SortingCol,
  SortType,
  Query,
) => {
  try {
    const response = await getAllCoursesadmin(
      pageNumber,
      rowsOfPage,
      SortingCol,
      SortType,
      Query,
    );
    if (response) {
      console.log("allcourses", response);
      return response.data;
    }
  } catch (error) {
    console.error("error getCourseCreateDataCall:", error);
  }
};
