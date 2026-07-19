import apiClient from "../../interceptor";

export const createClassRoom = async (body) => {
  const response = await apiClient.post("/ClassRoom", body);

  console.log("ایجاد کلاس:", response.data);

  return response;
};
