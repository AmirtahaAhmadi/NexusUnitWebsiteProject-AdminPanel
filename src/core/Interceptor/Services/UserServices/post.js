import apiClient from "../../interceptor";

export const postCreateUser = (
  lastName,
  firstName,
  gmail,
  password,
  phoneNumber,
  isStudent,
  isTeacher,
) => {
  return apiClient.post("/User/CreateUser", {
    lastName: lastName,
    firstName: firstName,
    gmail: gmail,
    password: password,
    phoneNumber: phoneNumber,
    isStudent: isStudent,
    isTeacher: isTeacher,
  });
};

export const postAddUserAccess = (roleId, userId) => {
  return apiClient.post("/User/AddUserAccess", {
    roleId: roleId,
    userId: userId,
  });
};

export const postSendReserveToCourse = (courseId, courseGroupId, studentId) => {
  return apiClient.post("/CourseReserve/SendReserveToCourse", {
    courseId: courseId,
    courseGroupId: courseGroupId,
    studentId: studentId,
  });
};
