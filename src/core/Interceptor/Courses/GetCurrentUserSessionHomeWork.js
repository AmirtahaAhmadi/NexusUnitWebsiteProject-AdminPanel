import apiClient from "../interceptor";

const GetCurrentUserSessionHomeWork = (Id) => {
  return apiClient.get(`/Session/StudentHomeworkList`);
};
export const GetCurrentUserSessionHomeWorkcall = async (Id) => {
  try {
    const result = await GetCurrentUserSessionHomeWork(Id);
    console.log("assdagvag", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
