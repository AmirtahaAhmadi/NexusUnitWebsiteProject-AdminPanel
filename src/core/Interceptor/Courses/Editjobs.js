import apiClient from "../interceptor";

export const Editjobs = (data) => {
  return apiClient.put("/AssistanceWork", {
    worktitle: data.worktitle,
    workDescribe: data.workDescribe,
    assistanceId: data.assistanceId,
    workDate: data.workDate,
    id: data.id,
  });
};
