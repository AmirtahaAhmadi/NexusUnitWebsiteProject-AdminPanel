import apiClient from "../interceptor";

export const CreateNewtechnology = (data) => {
  return apiClient.post("/Technology", {
    techName: data.techName,
    describe: data.describe,
    iconAddress: data.iconAddress,
  });
};
