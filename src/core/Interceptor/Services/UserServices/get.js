import apiClient from "../../interceptor";

export const getAllUsers = ({
  pageNumber,
  rowOfPage,
  sortingCol,
  sortType,
  query,
  isActiveUser,
  isDeletedUser,
  roleId,
}) => {
  return apiClient.get("/User/UserMannage", {
    params: {
      PageNumber: pageNumber,
      RowsOfPage: rowOfPage,
      SortingCol: sortingCol,
      SortType: sortType,
      Query: query,
      IsActiveUser: isActiveUser,
      IsDeletedUser: isDeletedUser,
      roleId: roleId,
    },
  });
};

export const getUserDetails = (userId) => {
  return apiClient.get("/User/UserDetails/" + userId, {
    params: {
      UserId: userId,
    },
  });
};

export const getUserSkills = (userId) => {
  return apiClient.get("/User/UserSkills/" + userId, {
    params: {
      UserId: userId,
    },
  });
};

export const getCourseDetails = (id) => {
  return apiClient.get("/Course/" + id);
};

export const getUserCourseReserve = (courseId) => {
  return apiClient.get("/CourseReserve/" + courseId, {
    params: {
      CourseId: courseId,
    },
  });
};

export const getUserPayments = ({ courseId }) => {
  return apiClient.get("/CoursePayment", {
    params: {
      CourseId: courseId,
      // StudentId: studentId,
    },
  });
};

export const getCourseComments = ({
  pageNumber,
  rowOfPage,
  sortingCol,
  sortType,
  query,
  accept,
  teacherId,
  userId,
}) => {
  return apiClient.get("/Course/CommentManagment", {
    params: {
      PageNumber: pageNumber,
      RowsOfPage: rowOfPage,
      SortingCol: sortingCol,
      SortType: sortType,
      Query: query,
      Accept: accept,
      TeacherId: teacherId,
      userId: userId,
    },
  });
};

export const getAccountProfileInfo = () => {
  return apiClient.get("/SharePanel/GetProfileInfo");
};

export const getCourseGroupId = (teacherId, courseId) => {
  return apiClient.get("/CourseGroup/GetCourseGroup", {
    params: {
      TeacherId: teacherId,
      CourseId: courseId,
    },
  });
};
