import { Editjobs } from "./Editjobs";

export const EditJobscall = async (data) => {
  try {
    const result = await Editjobs(data);
    if (result) {
      console.log("got result", result);
      return result;
    }
  } catch (error) {
    console.error("this an error", error);
    return error;
  }
};
