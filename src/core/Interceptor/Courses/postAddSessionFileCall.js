import apiClient from "../interceptor";

const addSessionFile = (data) => {
  const formData = new FormData();
  formData.append("SessionId", data?.sessionId);

  if (data?.SessionFiles) {
    formData.append("SessionFiles", data?.SessionFiles);
  }

  console.log("addSessionFile FormData", [...formData.entries()]);

  return apiClient.post("/Session/AddSessionFile", formData);
};

export const postAddSessionFileCall = async (data) => {
  try {
    const result = await addSessionFile(data);
    return result.data;
  } catch (error) {
    console.log("ad session file error", error);
    throw error;
  }
};
