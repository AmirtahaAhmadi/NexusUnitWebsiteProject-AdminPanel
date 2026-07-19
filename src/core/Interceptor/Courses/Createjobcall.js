import { Createjobs } from "./Createjobs";

export const Createjobcall = async (data) => {
  try {
    const result = await Createjobs(data);
    if (result) {
      console.log("got result", result);
      return result;
    }
  } catch (error) {
    console.error("this an error", error);
    return false;
  }
};
