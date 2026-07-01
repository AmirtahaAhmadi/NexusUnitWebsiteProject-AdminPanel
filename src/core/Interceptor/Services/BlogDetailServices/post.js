import apiClient from "../../interceptor";

export const addComment = (newsId, userIpAddress, title, describe, userId) => {
  return apiClient.post("/News/CreateNewsComment", {
    newsId: newsId,
    userIpAddress: userIpAddress,
    title: title,
    describe: describe,
    userId: userId,
  });
};

export const addNewsLike = (newsId) => {
  return apiClient.post(`/News/NewsLike/${newsId}`);
};

export const addCommentLike = (commentId, likeType = "Like") => {
  return apiClient.post(`/News/CommentLike/${commentId}?LikeType=${likeType}`);
};

export const addCommentDissLike = (commentId) => {
  return apiClient.post(`/News/CommentLike/${commentId}?LikeType=DisLike`);
};

export const addReplyComment = (newsId, parentId, describe, userId) => {
  return apiClient.post("/News/CreateNewsReplyComment", {
    newsId: newsId,
    userIpAddress: "",
    title: "",
    describe: describe,
    userId: userId,
    parentId: parentId,
  });
};

export const deleteCommentLike = (commentId) => {
  return apiClient.delete("/News/DeleteCommentLikeNews", {
    data: { deleteEntityId: commentId },
  });
};

export const addNewsLikeBlog = (newsId) => {
  return apiClient.post(`/News/NewsLike/${newsId}`);
};
export const addNewsRate = (newsId, rateNumber) => {
  return apiClient.post(`/News/NewsRate`, null, {
    params: {
      NewsId: newsId,
      RateNumber: rateNumber,
    },
  });
};
