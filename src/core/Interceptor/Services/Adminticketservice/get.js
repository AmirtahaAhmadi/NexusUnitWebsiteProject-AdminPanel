import apiClient from "../../interceptor";

export const getAllTickets = (params) =>
  apiClient.get("/ticket/AllTickets", { params });

export const getAllTicketsNotAccepted = async (params = {}) => {
  const res = await apiClient.get("/ticket/AllTicketsNotAccepted", {
    params,
  });

  console.log("REQUEST PARAMS:", params);
  console.log("API NOT ACCEPTED =>", res);

  return res;
};

export const getChatDetailUser = (id) =>
  apiClient.get(`/ticket/message/chatDetailUser/${id}`);

export const getChatDetailSupport = (id) =>
  apiClient.get(`/ticket/message/chatDetailSupport/${id}`);