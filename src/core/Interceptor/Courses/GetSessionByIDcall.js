import apiClient from "../interceptor";

const GetSessionByID = (id) => {
  return apiClient.get("/Session/SessionDetail", {
    params: { SessionId: id },
  });
};

export const GetSessionByIDcall = async (id) => {
  try {
    const result = await GetSessionByID(id);
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
