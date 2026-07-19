import { CreatecourseLevel } from "./CreatecourseLevel";

export const CreateCourseLevelCall = async (data) => {
  try {
    const result = await CreatecourseLevel(data);
    if (result) {
      console.log("got result", result);
      return result;
    }
  } catch (error) {
    console.error("this an error", error);
    return error;
  }
};
