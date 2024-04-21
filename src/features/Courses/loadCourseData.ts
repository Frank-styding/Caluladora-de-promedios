import { CoursesState, ICoursesData } from "./CoursesState";

const COURSE_DATA: ICoursesData = {
  "Cálculo Integral": {
    pc: {
      count: 4,
      deleteCount: 1,
      weight: 0.3,
      precision: 1,
      round: false,
    },
    pd: {
      count: 4,
      deleteCount: 1,
      weight: 0.1,
      precision: 1,
      round: false,
    },
    parcial: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
    final: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
  },
  "Cálculo en Varias Variables": {
    pc: {
      count: 4,
      deleteCount: 1,
      weight: 0.3,
      precision: 1,
      round: false,
    },
    pd: {
      count: 4,
      deleteCount: 1,
      weight: 0.1,
      precision: 1,
      round: false,
    },
    parcial: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
    final: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
  },
  "Diseño digital": {
    lab: {
      count: 10,
      deleteCount: 1,
      weight: 0.2,
      precision: 1,
      round: false,
    },
    tarea: {
      count: 1,
      deleteCount: 0,
      weight: 0.2,
      precision: 1,
      round: false,
    },
    parcial: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
    final: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
  },

  "Física 2": {
    pc: {
      count: 4,
      deleteCount: 1,
      weight: 0.4,
      precision: 1,
      round: false,
    },
    parcial: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
    final: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
  },

  "Lab Física": {
    labs: {
      count: 6,
      deleteCount: 1,
      weight: 1,
      precision: 1,
      round: false,
    },
  },

  psicologia: {
    participación: {
      count: 1,
      deleteCount: 0,
      weight: 0.1,
      precision: 1,
      round: false,
    },
    permanete: {
      count: 4,
      deleteCount: 0,
      weight: 0.2,
      precision: 1,
      round: false,
    },
    parcial: {
      count: 1,
      deleteCount: 0,
      weight: 0.4,
      precision: 1,
      round: false,
    },
    oral: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
  },
  "Estructuras Discretas": {
    pc: {
      count: 4,
      deleteCount: 1,
      weight: 0.3,
      precision: 1,
      round: false,
    },
    parical: {
      count: 1,
      deleteCount: 0,
      weight: 0.3,
      precision: 1,
      round: false,
    },
    final: {
      count: 1,
      deleteCount: 0,
      weight: 0.4,
      precision: 1,
      round: false,
    },
  },
};
function initilizeData(state: CoursesState) {
  state.coursesData ||= COURSE_DATA;
  const courseNames = Object.keys(state.coursesData);
  state.grades ||= {};
  state.finalGrades ||= {};
  state.avarages ||= {};
  courseNames.forEach((courseName) => {
    const examNames = Object.keys(state.coursesData[courseName]);
    examNames.forEach((examName) => {
      state.grades[courseName] ||= {};
      state.grades[courseName][examName] ||= new Array(
        state.coursesData[courseName][examName].count
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
