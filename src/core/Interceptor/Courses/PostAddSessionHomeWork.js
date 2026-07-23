import apiClient from "../interceptor";

const PostAddSessionHomeWork = (data) => {
  console.log("data", data);
  return apiClient.post("/Session/AddSessionHomeWork", {
    sessionId: data.sessionId,
    hwTitle: data.hwTitle,
    hwDescribe: data.hwDescribe,
  });
};

export const PostAddSessionHomeWorkcall = async (data) => {
  try {
    const result = await PostAddSessionHomeWork(data);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
