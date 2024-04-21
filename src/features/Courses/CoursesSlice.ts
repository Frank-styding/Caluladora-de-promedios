import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { loadCourseData } from "./loadCourseData";

const initialState = loadCourseData();
export const gradesSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    updateGrade: (
      state,
      action: PayloadAction<{
        courseName: string;
        examName: string;
        idx: number;
        grade: number;
      }>
    ) => {
      const { courseName, examName, idx, grade } = action.payload;
      state.grades[courseName][examName][idx] = grade;
      const courseData = state.coursesData;
      const finalGrade = Object.keys(courseData[courseName])
        .map((examName) => {
          const { count, deleteCount, weight, precision, round } =
            courseData[courseName][examName];

          let grades = state.grades[courseName][examName].slice();
          grades.sort();
          grades = grades.map((i) => {
            if (i == -1) return 0;
            return i;
          });

          let avarage =
            grades.slice(deleteCount).reduce((a, b) => a + b, 0) /
            (count - deleteCount);

          if (round) {
            avarage = parseFloat(avarage.toFixed(precision));
          } else {
            const divider = Math.pow(10, precision);
            avarage = Math.trunc(avarage * divider) / divider;
          }
          state.avarages[courseName][examName] = avarage;
          return avarage * weight;
        })
        .reduce((a, b) => a + b, 0);

      state.finalGrades[courseName] = Math.trunc(finalGrade * 100) / 100;
    },
  },
});

export const { updateGrade } = gradesSlice.actions;
export const getCoursesData = (state: RootState) => state.courses.coursesData;
export const getCoursesAvarageGrades = (state: RootState) =>
  state.courses.avarages;

export const getCoursesFinalGrades = (state: RootState) =>
  state.courses.finalGrades;
export const getCoursesGrades = (state: RootState) => state.courses.grades;
export default gradesSlice.reducer;
