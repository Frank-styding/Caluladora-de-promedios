import styled from "styled-components";
import { Theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Theme.background};
  display: grid;
  grid-template-rows: auto 80px;
`;

function ViewCourses() {
  return <></>;
}

const StyledNav = styled.nav`
  grid-row: 2;
  background-color: ${Theme.secundary};
`;
function Nav() {
  return <StyledNav></StyledNav>;
}

function Layout() {
  return (
    <LayoutContainer>
      <Nav />
    </LayoutContainer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ViewCourses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
