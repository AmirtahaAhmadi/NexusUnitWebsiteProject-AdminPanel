import { EditTech } from "./EditTech";

export const EditTechCall = async (data) => {
  try {
    const result = await EditTech(data);
    if (result) {
      console.log("got result", result);
      return result;
    }
  } catch (error) {
    console.error("this an error", error);
    return error;
  }
};
