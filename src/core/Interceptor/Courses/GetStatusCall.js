import { GetStatus } from "./GetStatus";

export const GetStatusCall = async (data) => {
  try {
    const result = await GetStatus(data);
    if (result) {
      console.log("got result", result);
      return result;
    }
  } catch (error) {
    console.error("this an error", error);
    return error;
  }
};
