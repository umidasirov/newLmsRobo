import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [course,setCourse] = useState([])
  const [courseData,setCourseData] = useState([])
  const [d,setD] = useState({})
  const user =
    {
      name: "Umid",
      phone: "+998950934060",
      balans: 50000,
      level: 12,
      bought: [
        {
          "id": 1, //kursni id si boladi otta 
          "status":"bougt" // yoki true false qisegam boloradi
        },
      ]
    }
    
  
  return (
    <DataContext.Provider
      value={{
        setCourse,
        course,
        setCourseData,
        courseData,
        user,
        data,
        setData,
        blogData,
        setBlogData,
        teacherData,
        setTeacherData,
        d,
        setD
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
