import { GetTeachers } from "./getallteachers";
export const GetTeacherscall = async () => {
  try {
    const response = await GetTeachers();
    return response.data;
  } catch (error) {
    console.error("erorr for getCourseType ", error);
    throw error;
  }
};
