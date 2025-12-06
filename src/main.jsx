import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import root from "./router/index.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { CoursesProvider } from "./context/CoursesContext.jsx";
import { BlogProvider } from "./context/BlogContext.jsx";
import { TeachersProvider } from "./context/TeachersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <CoursesProvider>
        <BlogProvider>
          <TeachersProvider>
            <RouterProvider router={root} />
          </TeachersProvider>
        </BlogProvider>
      </CoursesProvider>
    </UserProvider>
  </StrictMode>
);
