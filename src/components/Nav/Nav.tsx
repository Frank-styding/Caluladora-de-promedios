import styled from "styled-components";
import { Theme } from "../../theme";
import { Link, useLocation } from "react-router-dom";
import { GearIcon } from "../icons/GearIcon";
import { CoursesIcon } from "../icons/CoursesIcon";
import { StatisticsIcon } from "../icons/StatisticsIcon";

const StyledNav = styled.nav`
  width: 100%;
  height: 100%;
  background-color: ${Theme.secundary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 4em;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    background-color: transparent !important;
  }
`;

export function Nav() {
  const location = useLocation();
  const activeColor = (path: string) =>
    location.pathname.startsWith(path) ? Theme.navActive : Theme.navColor;
  return (
    <StyledNav>
      <StyledLink to={"/settings"}>
        <GearIcon color={activeColor("/settings")} />
      </StyledLink>
      <StyledLink to={"/courses"}>
        <CoursesIcon color={activeColor("/course")} />
      </StyledLink>
      <StyledLink to={"/statistics"}>
        <StatisticsIcon color={activeColor("/statistics")} />
      </StyledLink>
    </StyledNav>
  );
}
