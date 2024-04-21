import { configureStore } from "@reduxjs/toolkit";
import CoursesSlice from "./features/Courses/CoursesSlice";
import { saveCourseData } from "./features/Courses/loadCourseData";

export const store = configureStore({
  reducer: {
    courses: CoursesSlice,
  },
});

store.subscribe(() => {
  saveCourseData(store.getState().courses);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
