import React, { createContext, useContext, useState } from "react";

const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        setCourses,
        courseDetail,
        setCourseDetail,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => useContext(CoursesContext);
