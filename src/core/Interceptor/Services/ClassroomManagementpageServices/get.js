import apiClient from "../../interceptor";

export const getClassRooms = async () => {
  const response = await apiClient.get("/ClassRoom");

  console.log("لیست کلاس‌ها:", response.data);

  return response;
};