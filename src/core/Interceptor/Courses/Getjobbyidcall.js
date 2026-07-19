import { getjobByid } from "./GetJobbyid";
export const GetJobByIdCall = async (Id) => {
  try {
    const result = await getjobByid(Id);
    console.log("assdagvag", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
