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
    getExamState: (
      state,
      action: PayloadAction<{
        courseName: string;
        examName: string;
        examState?: number;
      }>
    ) => {
      const gradesStarted = state.grades[action.payload.courseName][
        action.payload.examName
      ].filter((grades) => grades != -1);

      if (gradesStarted.length == 0) {
        action.payload.examState = -1;
        return state;
      }

      const finalgrades =
        gradesStarted.reduce((a, b) => a + b, 0) / gradesStarted.length;

      action.payload.examState = -1;
      //! TODO change value in settings
      if (0 <= finalgrades && finalgrades < 11) {
        action.payload.examState = 0;
      } else if (11 <= finalgrades && finalgrades <= 16) {
        action.payload.examState = 1;
      } else if (16 < finalgrades && finalgrades <= 20) {
        action.payload.examState = 2;
      }
    },

    getCourseState: (
      state,
      action: PayloadAction<{
        courseName: string;
        courseState?: number;
      }>
    ) => {
      const courseGrades = state.grades[action.payload.courseName];
      const courseData = state.coursesData[action.payload.courseName];
      let maxFinalGrade = 0;
      const finalGrade = Object.keys(courseGrades)
        .map((examName) => {
          const gradesStarted = courseGrades[examName].filter(
            (grades) => grades != -1
          );
          if (gradesStarted.length == 0) {
            return 0;
          }
          const { weight } = courseData[examName];
          const finalgrades =
            gradesStarted.reduce((a, b) => a + b, 0) / gradesStarted.length;
          maxFinalGrade +=
            ((gradesStarted.length * 20) / gradesStarted.length) * weight;
          return finalgrades * weight;
        })
        .reduce((a, b) => a + b, 0);

      const aux = (finalGrade / maxFinalGrade) * 100;
      console.log(finalGrade, maxFinalGrade);
      action.payload.courseState = -1;
      if (0 < aux && aux <= 51) {
        action.payload.courseState = 0;
      } else if (51 < aux && aux < 75) {
        action.payload.courseState = 1;
      } else if (75 <= aux && aux <= 100) {
        action.payload.courseState = 2;
      }
    },
  },
});

export const { updateGrade, getExamState, getCourseState } =
  gradesSlice.actions;
export const getCoursesData = (state: RootState) => state.courses.coursesData;
export const getCoursesAvarageGrades = (state: RootState) =>
  state.courses.avarages;

export const getCoursesFinalGrades = (state: RootState) =>
  state.courses.finalGrades;
export const getCoursesGrades = (state: RootState) => state.courses.grades;
export default gradesSlice.reducer;
