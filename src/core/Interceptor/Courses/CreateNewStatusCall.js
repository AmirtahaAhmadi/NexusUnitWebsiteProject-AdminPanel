import { CreateNewStatus } from "./CreateNewStatus";
export const CreateNewStatusCall = async (data) => {
  try {
    const result = await CreateNewStatus(data);
    console.log("status sended ", result);
    return result;
  } catch (error) {
    console.error("this an error", error);
    return error;
  }
};
