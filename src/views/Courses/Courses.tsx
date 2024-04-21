import styled from "styled-components";
import { CourseItem } from "./CourseItem";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getCoursesData } from "../../features/Courses/CoursesSlice";

const StyledCourses = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export function Courses() {
  const data = useAppSelector(getCoursesData);
  return (
    <StyledCourses>
      <ItemsContainer>
        {Object.keys(data).map((courseName) => (
          <CourseItem name={courseName} key={courseName} />
        ))}
      </ItemsContainer>
    </StyledCourses>
  );
}
