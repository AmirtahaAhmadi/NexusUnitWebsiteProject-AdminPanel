import apiClient from "../interceptor";

export const CreateNewStatus = (data) => {
  return apiClient.post("/Status", {
    statusName: data.statusName,
    describe: data.describe,
    statusNumber: data.statusNumber,
  });
};
