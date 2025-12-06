import React, { createContext, useContext, useState } from "react";

const TeachersContext = createContext();

export const TeachersProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);

  return (
    <TeachersContext.Provider
      value={{
        teachers,
        setTeachers,
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
};

export const useTeachers = () => useContext(TeachersContext);
