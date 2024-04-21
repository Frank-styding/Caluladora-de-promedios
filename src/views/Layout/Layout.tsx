import styled from "styled-components";
import { Nav } from "../../components/Nav/Nav";
import { Outlet } from "react-router-dom";

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 80px;
`;

const NavContainer = styled.footer`
  grid-row: 2;
`;

const OutletContainer = styled.div`
  grid-row: 1;
  width: 100%;
  height: calc(100vh - 80px);
`;

export function Layout() {
  return (
    <LayoutContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <NavContainer>
        <Nav />
      </NavContainer>
    </LayoutContainer>
  );
}
