import apiClient from "../../interceptor";

export const postLogin = (phoneOrGmail, password, rememberMe) => {
  return apiClient.post("/Sign/Login", {
    phoneOrGmail: phoneOrGmail,
    password: password,
    rememberMe: rememberMe,
  });
};
