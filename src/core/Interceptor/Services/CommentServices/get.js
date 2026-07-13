import apiClient from "../../interceptor";

export const getNewsComments = (newsId) => {
  return apiClient.get("/News/GetNewsComments", {
    params: {
      NewsId: newsId,
    },
  });
};

export const getCourseReplyComment = (courseId, commentId) => {
  return apiClient.get(
    "/Course/GetCourseReplyCommnets/" + courseId + "/" + commentId,
  );
};

export const getNewsReplyComment = (commentId) => {
  return apiClient.get("/News/GetRepliesComments", {
    params: {
      Id: commentId,
    },
  });
};
