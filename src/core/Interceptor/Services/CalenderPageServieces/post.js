import apiClient from '../../interceptor'

export const addSchedualSingle = (currentCurseId, data) =>
  apiClient.post('/Schedual/AddSchedualSingle', data, {
    params: {
      currentCurseId
    }
  })