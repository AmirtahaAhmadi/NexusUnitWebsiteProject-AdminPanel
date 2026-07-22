import apiClient from "../interceptor";

const GetSessionHomeWorks = (id) => {
  return apiClient.get("/Session/GetSessionHomeWork", {
    params: { SessionId: id },
  });
};

export const GetSessionHomeWorksCall = async (id) => {
  try {
    const result = await GetSessionHomeWorks(id);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
