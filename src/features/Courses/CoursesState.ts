export type FinalGrade = {
  precision: number;
  fixed: boolean;
  round: boolean;
};

export type ExamData = {
  count: number;
  deleteCount: number;
  weight: number;
  precision: number;
  fixed: boolean;
  round: boolean;
};

type CourseData = {
  [K: string]: ExamData | FinalGrade;
  _: FinalGrade;
};
export type ICoursesData = Record<string, CourseData>;

type IGrades = Record<string, Record<string, number[]>>;
export interface CoursesState {
  coursesData: ICoursesData;
  grades: IGrades;
  finalGrades: Record<string, number>;
  averages: Record<string, Record<string, number>>;
}
