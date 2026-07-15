import apiClient from "../interceptor";

export const EditTech = (data) => {
  return apiClient.put("/Technology", {
    techName: data.techName,
    parentId: data.parentId,
    describe: data.describe,
    iconAddress: data.iconAddress,
    id: data.id,
  });
};

// {
//   "techName": "<string>",
//   "parentId": "<integer>",
//   "describe": "<string>",
//   "iconAddress": "<string>",
//   "id": "<integer>"
// }
