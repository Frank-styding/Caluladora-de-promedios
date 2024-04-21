import styled from "styled-components";
import { Theme } from "../../theme";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getCoursesFinalGrades } from "../../features/Courses/CoursesSlice";

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
  color: ${Theme.grageColor};
  font-family: ${Theme.fontFamily};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function CourseItem({ name }: { name: string }) {
  const finalGrade = useAppSelector(getCoursesFinalGrades)[name];

  return (
    <StyledCourseItem to={"/course/" + name}>
      <StyledIndicator $color={Theme.goodGrade} />
      <StyledName>{name}</StyledName>
      <StyledGrade>{finalGrade}</StyledGrade>
    </StyledCourseItem>
  );
}
