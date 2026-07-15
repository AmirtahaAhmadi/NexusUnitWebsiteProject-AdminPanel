import { GetSocialGroup } from "./GetSocialGroup";

export const GetSocialGroupCall = async () => {
  try {
    const result = await GetSocialGroup();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
