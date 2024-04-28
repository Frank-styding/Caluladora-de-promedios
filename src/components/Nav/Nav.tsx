import styled from "styled-components";
import { Theme } from "../../theme";
import { Link, useLocation } from "react-router-dom";
import { GearIcon } from "../icons/GearIcon";
import { CoursesIcon } from "../icons/CoursesIcon";
import { StatisticsIcon } from "../icons/StatisticsIcon";
import { useState } from "react";

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

const NavLink = ({
  to,
  icon,
}: {
  to: string;
  icon: ({ color }: { color: string }) => JSX.Element;
}) => {
  const location = useLocation();
  const [onHover, setOnHover] = useState(false);

  const activeColor = (path: string) =>
    location.pathname.startsWith(path) ? Theme.navActive : Theme.navColor;

  return (
    <StyledLink
      onMouseOver={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      to={to}
    >
      {icon({ color: onHover ? Theme.navHover : activeColor(to) })}
    </StyledLink>
  );
};

export function Nav() {
  return (
    <StyledNav>
      <NavLink to={"/settings"} icon={GearIcon} />
      <NavLink to={"/courses"} icon={CoursesIcon} />
      <NavLink to={"/statistics"} icon={StatisticsIcon} />
    </StyledNav>
  );
}
