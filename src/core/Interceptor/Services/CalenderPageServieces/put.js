import apiClient from "../../interceptor";

export const lockToRiase = (active, id) =>
  apiClient.put("/Schedual/LockToRiase", {
    active,
    id,
  });