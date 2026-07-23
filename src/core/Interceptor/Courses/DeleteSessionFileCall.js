import apiClient from "../interceptor";

const DeleteSessionFile = (data) => {
  return apiClient.DELETE("/Session/DeleteSessionFile", {
    sessionFileId: data.id,
  });
};

export const DeleteSessionFileCall = async (data) => {
  try {
    const result = await Editjobs(data);
    if (result) {
      console.log("got result", result);
      return result;
    }
  } catch (error) {
    console.error("this an error", error);
    return error;
  }
};
