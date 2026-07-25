import {
  deleteCourseReserve,
  deleteUser,
} from "../../../../core/Interceptor/Services/UserServices/delete";
import { getCourseDetails, getUserDetails } from "../../../../core/Interceptor/Services/UserServices/get";
import { postSendReserveToCourse } from "../../../../core/Interceptor/Services/UserServices/post";
import { handleSuccess } from "../../../extensions/sweet-alert/SweetAlerts";

export const UserDetails = async (userId) => {
  try {
    const response = await getUserDetails(userId);
    console.log(response);
    if (response.data.success === true) {
      console.log(response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log("Error Data: ", error.response.data);
      if (error.response.data.success === false) {
        console.log(error.response.data.message);
      } else {
        console.log("خطایی رخ داده است");
      }
    } else if (error.request) {
      console.log("خطا در ارتباط با سرور لطفا اینترنت خود را بررسی کنید");
    } else {
      console.error(error);
    }
  } finally {
    console.log("");
  }
};

export const DeleteUser = async (userId) => {
  try {
    const response = await deleteUser(userId);
    // console.log(response);
    if (response.data.success === true) {
      console.log(response.data.message);
      handleSuccess("کاربر مورد نظر با موفقیت حذف شد!");
    }
  } catch (error) {
    console.log("deleteUser error: ", error.response.data);
  }
};

export const SendReserveToCourse = async (
  courseId,
  courseGroupId,
  studentId,
) => {
  try {
    const response = await postSendReserveToCourse(
      courseId,
      courseGroupId,
      studentId,
    );
    // console.log(response);
    if (response.data.success == true) {
      console.log(response.data.message);
      handleSuccess("رزرو دوره مورد نظر با موفقیت تایید شد!");
    }
  } catch (error) {
    console.log("sendReserveToCourse error: ", error.response.data?.message);
  }
};

export const DelCourseReserve = async (id) => {
  try {
    const response = await deleteCourseReserve(id);
    console.log(response);
    if (response.data.success == true) {
      console.log(response.data.message);
      handleSuccess("رزرو دوره مورد نظر با موفقیت حذف شد!");
    }
  } catch (error) {
    console.log("deleteCourseReserve error: ", error.response.data?.message);
  }
};

export const GetCourseTeacherId = async (id) => {
  try {
    const response = await getCourseDetails(id);
    console.log(response);
    if (response.data.success == true) {
      console.log(response.data.message);
      handleSuccess("رزرو دوره مورد نظر با موفقیت حذف شد!");
    }
    return response.data.teacherId;
  } catch (error) {
    console.log("deleteCourseReserve error: ", error.response.data?.message);
  }
};
