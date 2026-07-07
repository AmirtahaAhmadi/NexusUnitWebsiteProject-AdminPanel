import apiClient from "../../interceptor";

export const updateClassRoom = async (body) => {
  const response = await apiClient.put("/ClassRoom", body);

  console.log("ویرایش کلاس:", response.data);

  return response;
};
