import apiClient from "../interceptor";

export const Editjobs = (data) => {
  return apiClient.post("/AssistanceWork", {
    worktitle: data.worktitle,
    workDescribe: data.workDescribe,
    assistanceId: data.assistanceId,
    workDate: data.workDate,
    id: data.id,
  });
};
