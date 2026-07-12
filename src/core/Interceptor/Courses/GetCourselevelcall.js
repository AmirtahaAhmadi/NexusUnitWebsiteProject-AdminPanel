import { GetCourselevel } from "./GetCourselevel";

export const GetCourselevelcall = async () => {
  try {
    const result = await GetCourselevel();
    console.log("got result for get assistans", result);
    return result;
  } catch (error) {
    console.error("this an error", error);
    throw error;
  }
};
