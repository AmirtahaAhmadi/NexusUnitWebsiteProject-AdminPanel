import apiClient from "../../interceptor";

export const deleteNewsFile = (fileId) => {
  return apiClient.delete("/News/DeleteNewsFile", {
    data: { deleteEntityId: fileId },
  });
};