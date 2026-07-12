import apiClient from "../../interceptor";

export const getAdminScheduals = (startDate, endDate, courseId) =>
  apiClient.get("/Schedual/GetAdminScheduals", {
    params: {
      startDate,
      endDate,
      courseId,
    },
  });


export const getStudentScheduals = (startDate, endDate, StudentId) =>
  apiClient.get("/Schedual/GetStudentScheduals", {
    params: {
      startDate,
      endDate,
      StudentId,
    },
  });

export const getTeacherScheduals = (startDate, endDate) =>
  apiClient.get("/Schedual/GetTeacherScheduals", {
    params: {
      startDate,
      endDate,
    },
  });

export const getSchedualDetail = (SchedualId) =>
  apiClient.get(`/Schedual/GetStudentScheduals/${SchedualId}`);

export const getTeachers = () => apiClient.get("/Home/GetTeachers");

export const getCoursesWithPagination = ({
  TeacherId,
  RowsOfPage = 100,
  PageNumber = 1,
} = {}) =>
  apiClient.get("/Home/GetCoursesWithPagination", {
    params: {
      TeacherId,
      RowsOfPage,
      PageNumber,
    },
  });

export const getCourseGroups = ({ CourseId, TeacherId }) =>
  apiClient.get("/CourseGroup/GetCourseGroup", {
    params: {
      CourseId,
      TeacherId,
    },
  });
