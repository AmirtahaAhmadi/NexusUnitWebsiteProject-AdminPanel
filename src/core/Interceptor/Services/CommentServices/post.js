import apiClient from "../../interceptor";

export const postAcceptCourseComment = (commentCourseId) => {
  return apiClient.post("/Course/AcceptCourseComment", null, {
    params: {
      CommentCourseId: commentCourseId,
    },
  });
};

export const postAddReplyCourseComment = (
  courseId,
  commentId,
  title,
  describe,
) => {
  const formData = new FormData();
  formData.append("CommentId", commentId);
  formData.append("CourseId", courseId);
  formData.append("Title", title);
  formData.append("Describe", describe);

  return apiClient.post("/Course/AddReplyCourseComment", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const postAddReplyNewsComment = (newsId, title, describe, userId, parentId) => {
  return apiClient.post("/News/CreateNewsReplyComment", {
    newsId: newsId,
    userIpAddress: "",
    title: title,
    describe: describe,
    userId: userId,
    parentId: parentId,
  });
};
