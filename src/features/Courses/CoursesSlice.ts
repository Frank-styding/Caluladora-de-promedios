import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { loadCourseData } from "./loadCourseData";
import { ExamData } from "./CoursesState";

const setPrecision = (
  value: number,
  precision: number,
  fixed: boolean = false
) => {
  if (fixed) {
    return parseFloat(value.toFixed(precision));
  }
  const divider = Math.pow(10, precision);
  return Math.trunc(value * divider) / divider;
};

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
      let finalGrade = Object.keys(courseData[courseName])
        .map((examName) => {
          if (examName == "_") return 0;
          const { count, deleteCount, weight, precision, fixed } = courseData[
            courseName
          ][examName] as ExamData;

          let grades = state.grades[courseName][examName].slice();
          grades.sort((a, b) => a - b);
          grades = grades.map((i) => {
            if (i == -1) return 0;
            return i;
          });

          let average =
            grades.slice(deleteCount).reduce((a, b) => a + b, 0) /
            (count - deleteCount);

          average = setPrecision(average, precision, fixed);
          state.averages[courseName][examName] = average;

          return average * weight;
        })
        .reduce((a, b) => a + b, 0);

      finalGrade = setPrecision(
        finalGrade,
        courseData[courseName]["_"].precision,
        courseData[courseName]["_"].fixed
      );

      if (courseData[courseName]["_"].round) {
        finalGrade = Math.round(finalGrade);
      }

      state.finalGrades[courseName] = finalGrade;
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
      const courseData = state.coursesData[action.payload.courseName];

      if (gradesStarted.length == 0) {
        action.payload.examState = -1;
        return state;
      }

      let finalGrade =
        gradesStarted.reduce((a, b) => a + b, 0) / gradesStarted.length;

      if (courseData["_"].round) {
        finalGrade = Math.round(finalGrade);
      }

      action.payload.examState = -1;
      //! TODO change value in settings
      if (0 <= finalGrade && finalGrade < 11) {
        action.payload.examState = 0;
      } else if (11 <= finalGrade && finalGrade <= 16) {
        action.payload.examState = 1;
      } else if (16 < finalGrade && finalGrade <= 20) {
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
      let finalGrade = Object.keys(courseGrades)
        .map((examName) => {
          if (examName == "_") return 0;
          const gradesStarted = courseGrades[examName].filter(
            (grades) => grades != -1
          );
          if (gradesStarted.length == 0) {
            return 0;
          }
          const { weight } = courseData[examName] as ExamData;

          const finalGrades =
            gradesStarted.reduce((a, b) => a + b, 0) / gradesStarted.length;

          maxFinalGrade +=
            ((gradesStarted.length * 20) / gradesStarted.length) * weight;

          return finalGrades * weight;
        })
        .reduce((a, b) => a + b, 0);
      finalGrade = setPrecision(
        finalGrade,
        courseData["_"].precision,
        courseData["_"].fixed
      );

      const aux = (finalGrade / maxFinalGrade) * 100;
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
export const getCoursesAverageGrades = (state: RootState) =>
  state.courses.averages;

export const getCoursesFinalGrades = (state: RootState) =>
  state.courses.finalGrades;
export const getCoursesGrades = (state: RootState) => state.courses.grades;
export default gradesSlice.reducer;
