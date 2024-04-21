import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "../../theme";
import { Exam } from "./Exam";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  getCoursesData,
  getCoursesFinalGrades,
} from "../../features/Courses/CoursesSlice";
import { useState } from "react";

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

const FinalGrade = styled.div`
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
`;

export function Course() {
  const { name: courseName } = useParams();
  const [active, setActive] = useState(-1);
  const data = useAppSelector(getCoursesData)[courseName || ""];

  const finalGrades = useAppSelector(getCoursesFinalGrades);

  return (
    <StyledCourse>
      <Title>{courseName}</Title>
      <ScroolContainer>
        <Container>
          {data &&
            Object.keys(data).map((examName, idx) => (
              <Exam
                courseName={courseName || ""}
                name={examName}
                key={examName}
                open={idx == active}
                onClick={() => setActive(idx != active ? idx : -1)}
              />
            ))}
        </Container>
        {data && <FinalGrade>{finalGrades[courseName || ""]}</FinalGrade>}
      </ScroolContainer>
    </StyledCourse>
  );
}
