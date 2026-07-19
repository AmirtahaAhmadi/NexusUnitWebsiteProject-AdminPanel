import { handleSuccess } from "../../../extensions/sweet-alert/SweetAlerts";
import {
  postAcceptCourseComment,
  postAddReplyCourseComment,
  postAddReplyNewsComment,
} from "../../../../core/Interceptor/Services/CommentServices/post";
import { deleteCourseComment } from "../../../../core/Interceptor/Services/CommentServices/delete";
import { getUserDetails } from "../../../../core/Interceptor/Services/UserServices/get";

export const AcceptCourseComment = async (commentCourseId) => {
  try {
    const response = await postAcceptCourseComment(commentCourseId);
    console.log(response.data);
    if (response.data.success == true) {
      console.log(response.data.message);
      handleSuccess("کامنت با موفقیت تایید شد!");
    }
  } catch (error) {
    console.log("acceptCourseComment error: ", error.response.data?.message);
  }
};

export const DeleteCourseComment = async (courseCommandId) => {
  try {
    const response = await deleteCourseComment(courseCommandId);
    if (response.data.success == true) {
      // console.log(response.data.message);
      handleSuccess("کامنت با موفقیت حذف شد!");
    }
  } catch (error) {
    console.log("deleteCourseComment error: ", error.response.data?.message);
  }
};

export const AddCourseCommentReply = async (
  courseId,
  commentId,
  title,
  describe,
) => {
  try {
    const response = await postAddReplyCourseComment(
      courseId,
      commentId,
      title,
      describe,
    );
    if (response.data.success == true) {
      // console.log(response.data.message);
      handleSuccess("پاسخ کامنت با موفقیت اضافه شد!");
    }
  } catch (error) {
    console.log("addReplyCourseComment error: ", error.response.data?.message);
  }
};

export const AddNewsCommentReply = async (newsId, title, describe, userId, parentId) => {
  try {
    const response = await postAddReplyNewsComment(
      newsId,
      title,
      describe,
      userId,
      parentId,
    );
    if (response.data.success == true) {
      // console.log(response.data.message);
      handleSuccess("پاسخ کامنت با موفقیت اضافه شد!");
    }
  } catch (error) {
    console.log("addReplyNewsComment error: ", error.response.data?.message);
  }
};

export const GetUserDetails = async (userId) => {
  try {
    const response = await getUserDetails(userId)
    if (response.data.success == true) {
      // console.log(response.data.message);
      return response.data;
    }
  } catch (error) {
    console.log("addReplyNewsComment error: ", error.response.data?.message);
  }
};
