import apiClient from "../interceptor";

export const Createjobs = (data) => {
  return apiClient.post("/AssistanceWork", {
    worktitle: data.worktitle,
    workDescribe: data.workDescribe,
    assistanceId: data.assistanceId,
    workDate: data.workDate,
  });
};
