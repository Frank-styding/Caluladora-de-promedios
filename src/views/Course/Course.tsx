import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../theme";
import { Exam } from "./Exam";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  getCoursesData,
  getCoursesFinalGrades,
  getCoursesGrades,
  getCourseState,
} from "../../features/Courses/CoursesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const StyledCourse = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px auto;
  position: relative;
`;

const Title = styled.h1`
  font-family: ${Theme.fontFamily};
  display: grid;
  place-content: center;
  color: ${Theme.textColor};
`;

const ScroolContainer = styled.div`
  width: 100%;
  max-height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FinalGrade = styled.div<{ $color?: string }>`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 60px;
  border-radius: 16px;
  background-color: ${Theme.secundary};
  font-size: ${Theme.h3.fontSize};
  color: ${Theme.textColor};
  display: grid;
  place-content: center;
  font-family: ${Theme.fontFamily};
  border: 1px solid ${({ $color }) => $color};
`;

export function Course() {
  const { name: courseName } = useParams();
  const [active, setActive] = useState(-1);
  const finalGrades = useAppSelector(getCoursesFinalGrades);
  const grades = useAppSelector(getCoursesGrades)[courseName || ""];
  const data = useAppSelector(getCoursesData)[courseName || ""];
  const dispatch = useDispatch();
  const [indicatorColor, setIndicatorColor] = useState("");

  useEffect(() => {
    const state = dispatch(getCourseState({ courseName: courseName || "" }))
      .payload.courseState;
    const color = [
      Theme.noneGrade,
      Theme.badGrade,
      Theme.halfGrade,
      Theme.goodGrade,
    ][(state == undefined ? -1 : state) + 1];
    setIndicatorColor(color);
  }, [courseName, dispatch, finalGrades, grades]);

  if (data == undefined) {
    return <></>;
  }

  return (
    <StyledCourse>
      <Title>{courseName}</Title>
      <ScroolContainer>
        <Container>
          {data &&
            Object.keys(data)
              .filter((i) => i != "_")
              .map((examName, idx) => (
                <Exam
                  courseName={courseName || ""}
                  name={examName}
                  key={examName}
                  open={idx == active}
                  onClick={() => setActive(idx != active ? idx : -1)}
                />
              ))}
        </Container>
        {data && (
          <FinalGrade $color={indicatorColor}>
            {finalGrades[courseName || ""]}
          </FinalGrade>
        )}
      </ScroolContainer>
    </StyledCourse>
  );
}
