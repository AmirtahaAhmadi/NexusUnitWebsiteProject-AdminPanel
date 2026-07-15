import { getjobs } from "./getjobs";
export const Getjobscall = async () => {
  try {
    const result = await getjobs();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
