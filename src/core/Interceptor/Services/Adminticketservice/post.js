import apiClient from "../../interceptor";

export const addTicketOverview = async ({
  overview,
  rate,
  solved,
  ticketId,
}) => {
  return apiClient.post("/ticket/ExistTicket/addOverview", {
    overview,
    rate,
    solved,
    ticketId,
  });
};

export const sendSupportMessage = ({ text, ticketId }) => {
  return apiClient.post("/ticket/message/sendSupport", {
    text,
    ticketId,
  });
};

export const checkExistTicket = (title) => {
  return apiClient.patch("/ticket/checkExistTicket", null, {
    params: { title },
  });
};

export const acceptTicket = (ticketId) => {
  return apiClient.patch(`/ticket/acceptTicket/${ticketId}`);
};