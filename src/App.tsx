import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./views/Layout/Layout";
import { Courses } from "./views/Courses/Courses";
import { Settings } from "./views/Settings/Settings";
import { Statistics } from "./views/Statistics/Statistics";
import { Course } from "./views/Course/Course";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Courses />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/courses/:name" element={<Course />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
