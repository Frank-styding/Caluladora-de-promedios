import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./views/Layout/Layout";
import { useEffect } from "react";
import { Courses } from "./views/Courses/Courses";
import { Settings } from "./views/Settings/Settings";
import { Statistics } from "./views/Statistics/Statistics";
import { Course } from "./views/Course/Course";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/courses");
  });
  return <></>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/course/:name" element={<Course />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
