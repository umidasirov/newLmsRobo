import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [course,setCourse] = useState([])
  const [courseData,setCourseData] = useState([])
  const user =
    {
      name: "Umid",
      phone: "+998950934060",
      balans: 50000,
      proccess: 10,
      level: 12,
      bought: [
        {
          "id": 1,
          "username": "Madaminov Salohiddin",
          "job": "python, mobile application",
          "about": "anything",
          "direction": "python, mobile application",
          "experience": "4",
          "work_place": "Infinite Co",
          "img": "/media/user/Otabek-Nurmatov.webp",
          "slug": "madaminov-salohiddin"
        },
        {
          "id": 1,
          "username": "Madaminov Salohiddin",
          "job": "python, mobile application",
          "about": "anything",
          "direction": "python, mobile application",
          "experience": "4",
          "work_place": "Infinite Co",
          "img": "/media/user/Otabek-Nurmatov.webp",
          "slug": "madaminov-salohiddin"
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
