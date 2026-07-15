import { getcoursebyidAdminTeacher } from "./getcoursebyidAdminTeacher";

export const getcoursebyidAdminTeacherCall = async (id) => {
  try {
    if (!id) return;
    const response = await getcoursebyidAdminTeacher(id);
    if (response) {
      console.log("courid course", response);
      return response.data;
    }
  } catch (error) {
    console.error("error getCourseCreateDataCall:", error);
    return false;
  }
};
