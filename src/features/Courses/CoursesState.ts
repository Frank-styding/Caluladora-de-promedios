export type ICoursesData = Record<
  string,
  Record<
    string,
    {
      count: number;
      deleteCount: number;
      weight: number;
      precision: number;
      round: boolean;
    }
  >
>;

type IGrades = Record<string, Record<string, number[]>>;
export interface CoursesState {
  coursesData: ICoursesData;
  grades: IGrades;
  finalGrades: Record<string, number>;
  avarages: Record<string, Record<string, number>>;
}
