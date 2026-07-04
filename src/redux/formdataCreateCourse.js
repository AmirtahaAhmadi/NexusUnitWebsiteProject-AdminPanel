import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseTypeId: "online",
  technologyIds: [],
  statusId: null,
  levelId: null,
  teacherId: null,
  termId: null,
  classRoomId: null,
};

const courseSlice = createSlice({
  name: "formdataCreateCourse",
  initialState,
  reducers: {
    updateCourseForm: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetCourseForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateCourseForm, resetCourseForm } = courseSlice.actions;
export default courseSlice.reducer;
