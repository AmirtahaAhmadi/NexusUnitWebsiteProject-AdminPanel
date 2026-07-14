import { GetAllTechnology } from "./GetAllTechnology";

export const GetAllTechnologyCall = async () => {
  try {
    const response = await GetAllTechnology();

    console.log("all tech here", response);
    return response;
  } catch (error) {
    console.error("error getCourseCreateDataCall:", error);
    return error;
  }
};
