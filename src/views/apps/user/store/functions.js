import { deleteCourseReserve, deleteUser } from "../../../../core/Interceptor/Services/UserServices/delete";
import { getUserDetails } from "../../../../core/Interceptor/Services/UserServices/get";
import { postSendReserveToCourse } from "../../../../core/Interceptor/Services/UserServices/post";

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
    console.log(response);
    if (response.data.success === true) {
      console.log(response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log("Error Data: ", error.response.data.message);
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

export const DelCourseReserve = async (id) => {
  try {
    const response = await deleteCourseReserve(id);
    console.log(response);
    if (response.data.success === true) {
      console.log(response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log("Error Data: ", error.response.data.message);
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
