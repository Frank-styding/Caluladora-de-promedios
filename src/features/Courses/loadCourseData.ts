import { COURSE_DATA } from "./COURSE_DATA";
import { CoursesState, ExamData } from "./CoursesState";

function initilizeData(state: CoursesState) {
  state.coursesData ||= COURSE_DATA;
  const courseNames = Object.keys(state.coursesData);
  state.grades ||= {};
  state.finalGrades ||= {};
  state.avarages ||= {};
  courseNames.forEach((courseName) => {
    const examNames = Object.keys(state.coursesData[courseName]);
    examNames.forEach((examName) => {
      if (examName == "_") return;
      state.grades[courseName] ||= {};
      state.grades[courseName][examName] ||= new Array(
        (state.coursesData[courseName][examName] as ExamData).count
      ).fill(-1);
      state.finalGrades[courseName] ||= 0;
      state.avarages[courseName] ||= {};
      state.avarages[courseName][examName] ||= 0;
    });
  });
}
export function loadCourseData(): CoursesState {
  const stringifyData = localStorage.getItem("data");
  let data;
  if (stringifyData == null) {
    data = {};
  } else {
    try {
      data = JSON.parse(stringifyData);
    } catch {
      console.log("Error parsing");
    }
  }
  const courseData = (data as CoursesState)["coursesData"];
  if (courseData != undefined) {
    if (Object.values(courseData).some((data) => data._ == undefined)) {
      data = {};
    }
  }

  initilizeData(data);
  return data;
}

export function saveCourseData(state: CoursesState) {
  try {
    localStorage.setItem("data", JSON.stringify(state));
  } catch {
    console.log("Error saving data");
  }
}
