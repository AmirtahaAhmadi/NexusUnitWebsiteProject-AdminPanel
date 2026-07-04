import { create } from "zustand";

const initialState = {
  Title: "",
  MiniDescribe: "",
  Describe: "",
  UniqeUrlString: "",
  Capacity: 0,
  SessionNumber: "",
  CurrentCoursePaymentNumber: 0,
  Cost: 0.0,
  StartTime: "",
  EndTime: "",
  CoursePrerequisiteId: "",
  GoogleTitle: "",
  GoogleSchema: "",
  ShortLink: "",
  ImageAddress: "",
  TumbImageAddress: "",
  Image: "",
  CourseTypeId: 123,
  TremId: null,
  ClassId: null,
  CourseLvlId: null,
  TeacherId: null,
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
