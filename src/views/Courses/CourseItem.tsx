import styled from "styled-components";
import { Theme } from "../../theme";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  getCoursesFinalGrades,
  getCoursesGrades,
  getCourseState,
} from "../../features/Courses/CoursesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const StyledCourseItem = styled(Link)`
  display: grid;
  grid-template-columns: 30px 1fr 80px;
  width: calc(100% - 2 * 20px);
  height: 10em;
  background-color: ${Theme.secundary};
  border-radius: 16px;
  padding: 10px;
  text-decoration: none;
`;
const StyledIndicator = styled.div<{ $color: string }>`
  width: 100%;
  height: 100%;
  padding: 10px 6px;
  &::after {
    content: "";
    display: flex;
    height: 100%;
    border-radius: 6px;
    background-color: ${({ $color }) => $color};
  }
`;
const StyledName = styled.h3`
  color: white;
  font-size: ${Theme.h3.fontSize};
  font-family: ${Theme.fontFamily};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StyledGrade = styled.h2`
  font-size: ${Theme.h2.fontSize};
  color: ${Theme.gradeColor};
  font-family: ${Theme.fontFamily};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function CourseItem({ name }: { name: string }) {
  const finalGrade = useAppSelector(getCoursesFinalGrades)[name];

  const grades = useAppSelector(getCoursesGrades)[name || ""];
  const dispatch = useDispatch();
  const [indicatorColor, setIndicatorColor] = useState("");

  useEffect(() => {
    const state = dispatch(getCourseState({ courseName: name || "" })).payload
      .courseState;
    const color = [
      Theme.noneGrade,
      Theme.badGrade,
      Theme.halfGrade,
      Theme.goodGrade,
    ][(state == undefined ? -1 : state) + 1];
    setIndicatorColor(color);
  }, [dispatch, finalGrade, grades, name]);
  return (
    <StyledCourseItem to={"/courses/" + name}>
      <StyledIndicator $color={indicatorColor} />
      <StyledName>{name}</StyledName>
      <StyledGrade>{finalGrade}</StyledGrade>
    </StyledCourseItem>
  );
}
