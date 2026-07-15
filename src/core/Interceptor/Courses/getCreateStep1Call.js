import { getCourseCreateData } from "./getCreateStep1";
export const getCourseCreateDataCall = async () => {
  try {
    const data = await getCourseCreateData();
    if (data) {
      console.log(" getCourseCreateData data.data", data.data);
      return data.data;
    }
  } catch (er) {
    console.error("got error for this getCreateStep1", er);
  }
};
