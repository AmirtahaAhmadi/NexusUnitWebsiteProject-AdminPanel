import apiClient from "../interceptor";

export const UpdateCourseCall = async (courseData, imageFile) => {
  const formData = new FormData();

  formData.append("Id", courseData.Id);
  formData.append("Title", courseData.Title);
  formData.append("Describe", courseData.Describe);
  formData.append("MiniDescribe", courseData.MiniDescribe);
  formData.append("Capacity", courseData.Capacity.toString());
  formData.append("CourseTypeId", courseData.CourseTypeId.toString());
  formData.append("SessionNumber", courseData.SessionNumber);
  formData.append(
    "CurrentCoursePaymentNumber",
    courseData.CurrentCoursePaymentNumber.toString(),
  );
  formData.append("TremId", courseData.TremId.toString());
  formData.append("ClassId", courseData.ClassId.toString());
  formData.append("CourseLvlId", courseData.CourseLvlId.toString());
  formData.append("TeacherId", courseData.TeacherId.toString());
  formData.append("Cost", courseData.Cost.toString());
  formData.append("UniqeUrlString", courseData.UniqeUrlString);
  formData.append("StartTime", courseData.StartTime);
  formData.append("EndTime", courseData.EndTime);
  formData.append("GoogleSchema", courseData.GoogleSchema);
  formData.append("GoogleTitle", courseData.GoogleTitle);
  formData.append("CoursePrerequisiteId", courseData.CoursePrerequisiteId);
  formData.append("ShortLink", courseData.ShortLink);
  formData.append("TumbImageAddress", courseData.TumbImageAddress);
  formData.append("ImageAddress", courseData.ImageAddress);

  if (imageFile) {
    formData.append("Image", imageFile);
  } else {
    formData.append("Image", courseData.Image);
  }

  try {
    const response = await apiClient.put("/Course", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("خطا در ارسال فرم:", error);
    return false;
  }
};
