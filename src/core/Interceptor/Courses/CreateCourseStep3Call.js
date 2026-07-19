import { CreatCourseStep3 } from "./CreateCourseStep3";

export const CreateCourseStep3Call = async (data) => {
  try {
    const result = await CreatCourseStep3(data);
    if (result) {
      console.log("کورس ساخته شد", result);
      return result;
    }
  } catch (error) {
    console.error("ارور", error);
    return error;
  }
};
