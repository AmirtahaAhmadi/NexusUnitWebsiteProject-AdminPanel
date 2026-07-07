import apiClient from "../../interceptor";

export const createDepartment = (data) => {
  return apiClient.post("/Department", {
    depName: data.depName,
    buildingId: Number(data.buildingId),
  });
};
