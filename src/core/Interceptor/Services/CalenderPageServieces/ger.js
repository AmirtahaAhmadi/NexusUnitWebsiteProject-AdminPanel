import apiClient from "../../interceptor"

export const getAdminScheduals = (startDate, endDate, courseId) =>
  apiClient.get('/Schedual/GetAdminScheduals', {
    params: {
      startDate,
      endDate,
      courseId
    }
  })

export const getStudentScheduals = (startDate, endDate, StudentId) =>
  apiClient.get('/Schedual/GetStudentScheduals', {
    params: {
      startDate,
      endDate,
      StudentId
    }
  })

export const getTeacherScheduals = (startDate, endDate) =>
  apiClient.get('/Schedual/GetTeacherScheduals', {
    params: {
      startDate,
      endDate
    }
  })

export const getSchedualDetail = (SchedualId) =>
  apiClient.get(`/Schedual/GetStudentScheduals/${SchedualId}`)