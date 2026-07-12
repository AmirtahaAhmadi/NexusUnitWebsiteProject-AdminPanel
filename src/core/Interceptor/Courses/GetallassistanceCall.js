import { Getallassistancework } from "./Getallassistancework";

export const Getassistans = async () => {
  try {
    const result = await Getallassistancework();
    console.log("got result for get assistans", result);
    return result;
  } catch (error) {
    console.error("this an error", error);
    throw error;
  }
};
