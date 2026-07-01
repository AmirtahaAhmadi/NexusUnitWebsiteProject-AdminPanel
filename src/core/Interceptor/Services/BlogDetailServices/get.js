import apiClient from "../../interceptor";

export const NewsBlogDetail = ({ Id }) => {
  return apiClient.get("/News/", {
    params: {
      Id: Id,
    },
  });
};

export const GetNewsComments = ({ NewsId }) => {
  return apiClient.get("/News/GetNewsComments", {
    params: {
      NewsId: NewsId,
    },
  });
};
