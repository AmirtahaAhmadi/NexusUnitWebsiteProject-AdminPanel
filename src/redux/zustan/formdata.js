import { create } from "zustand";

const initialState = {
  Title: "",
  MiniDescribe: "",
  Describe: "",
  UniqeUrlString: "",
  Capacity: "",
  SessionNumber: "",
  CurrentCoursePaymentNumber: "",
  Cost: "",
  StartTime: "",
  EndTime: "",
  CoursePrerequisiteId: "",
  GoogleTitle: "",
  GoogleSchema: "",
  ShortLink: "",
  ImageAddress: "",
  TumbImageAddress: "",
  Image: "",
  CourseTypeId: "1234",
  TremId: "",
  ClassId: "",
  CourseLvlId: "",
  TeacherId: "",
  TeacherName: "",
};
export const globalformData = create((set) => ({
  formData: initialState,
  updateformdata: (newfield) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...newfield,
      },
    })),

  resetFormData: () =>
    set({
      formData: initialState,
    }),
}));
