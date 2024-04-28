import styled from "styled-components";
import { Theme } from "../../theme";
import { GradeInput } from "./GradeInput";
import {
  getCoursesAvarageGrades,
  getCoursesData,
  getCoursesGrades,
  getExamState,
  updateGrade,
} from "../../features/Courses/CoursesSlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ExamData } from "../../features/Courses/CoursesState";

const ExamContainer1 = styled.div`
  width: 90%;
  min-height: 60px;
  background-color: ${Theme.tertiary};
  border-radius: 16px;
  display: grid;
  grid-template-rows: 60px auto;
  overflow: hidden;
  transition: max-height ease 100ms;
  max-height: 60px;
`;

const ExamContainer = styled(ExamContainer1)<{ $show: boolean }>`
  max-height: ${({ $show }) => ($show ? 500 : 60)}px;
`;

const StyledExam = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${Theme.secundary};
  border-radius: 16px;
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  align-items: center;
`;
const Indicator = styled.div<{ $color: string }>`
  display: flex;
  place-content: center;
  &::after {
    content: "";
    border-radius: 8px;
    width: 36px;
    height: 36px;
    background: ${({ $color }) => $color};
  }
`;
const ExamName = styled.h4`
  display: flex;
  place-content: center;
  justify-content: center;
  color: ${Theme.textColor};
  font-family: ${Theme.fontFamily};
  font-size: ${Theme.h3.fontSize};
`;
const Grade = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Theme.grageColor};
  font-family: ${Theme.fontFamily};
  font-size: ${Theme.h3.fontSize};
`;
const StyledGradesContainer = styled.div<{
  $rows: number;
  $columns: number;
}>`
  display: grid;
  justify-items: center;
  grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: 10px;
  padding: 10px 20px;
  place-content: center;
  overflow: hidden;
`;

export function Exam({
  name: examName,
  onClick,
  open,
  courseName,
}: {
  name: string;
  onClick: () => void;
  open: boolean;
  courseName: string;
}) {
  const examInfo = useAppSelector(getCoursesData)[courseName as string][
    examName
  ] as ExamData;

  const avarageGrades = useAppSelector(getCoursesAvarageGrades)[courseName][
    examName
  ];

  const grades = useAppSelector(getCoursesGrades)[courseName][examName];
  const dispatch = useDispatch();

  const [indicatorColor, setIndicatorColor] = useState("");

  const onChange = (value: string, idx: number) => {
    dispatch(
      updateGrade({
        courseName,
        examName,
        idx,
        grade: value == "" ? -1 : Math.max(0, Math.min(20, parseInt(value))),
      })
    );
  };
  useEffect(() => {
    const { examState } = dispatch(
      getExamState({ courseName, examName })
    ).payload;

    const color = [
      Theme.noneGrade,
      Theme.badGrade,
      Theme.halfGrade,
      Theme.goodGrade,
    ][(examState == undefined ? -1 : examState) + 1];

    setIndicatorColor(color);
  }, [courseName, dispatch, examName, indicatorColor, grades]);

  return (
    <ExamContainer $show={open}>
      <StyledExam onClick={() => onClick()}>
        <Indicator $color={indicatorColor} />
        <ExamName>{examName}</ExamName>
        {examInfo.count == 1 ? (
          <GradeInput
            showNumber={false}
            onChange={(value) => onChange(value, 0)}
            value={grades[0] == -1 ? "" : "" + grades[0]}
          />
        ) : (
          <Grade>{avarageGrades}</Grade>
        )}
      </StyledExam>
      {examInfo.count > 1 && (
        <StyledGradesContainer $rows={0} $columns={4}>
          {new Array<number>(examInfo.count).fill(0).map((_, idx) => (
            <GradeInput
              idx={idx + 1}
              key={courseName + ":" + examName + ":" + idx}
              onChange={(value) => onChange(value, idx)}
              value={grades[idx] == -1 ? "" : "" + grades[idx]}
            />
          ))}
        </StyledGradesContainer>
      )}
    </ExamContainer>
  );
}
