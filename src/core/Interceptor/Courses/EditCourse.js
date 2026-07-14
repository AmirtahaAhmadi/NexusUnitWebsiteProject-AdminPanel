import apiClient from "../interceptor";

export const EditCourse = (data) => {
  const formData = new FormData();

  formData.append("Title", data.Title);
  formData.append("Describe", data.Describe);
  formData.append("MiniDescribe", data.MiniDescribe);
  formData.append("Capacity", data.Capacity);
  formData.append("CourseTypeId", data.CourseTypeId);
  formData.append("SessionNumber", data.SessionNumber);

  formData.append(
    "CurrentCoursePaymentNumber",
    data.CurrentCoursePaymentNumber,
  );
  formData.append("TremId", data.TremId);
  formData.append("ClassId", data.ClassId);
  formData.append("CourseLvlId", data.CourseLvlId);
  formData.append("TeacherId", data.TeacherId);
  formData.append("Cost", data.Cost);
  formData.append("UniqeUrlString", data.UniqeUrlString);
  formData.append("Image", data.Image);
  formData.append("StartTime", data.StartTime);
  formData.append("EndTime", data.EndTime);
  formData.append("GoogleSchema", data.GoogleSchema);
  formData.append("GoogleTitle", data.GoogleTitle);
  formData.append("CoursePrerequisiteId", data.CoursePrerequisiteId);
  formData.append("ShortLink", data.ShortLink);
  formData.append("TumbImageAddress", data.TumbImageAddress);
  formData.append("ImageAddress", data.ImageAddress);

  return apiClient.put("/Course", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
