import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [course, setCourse] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [d, setD] = useState({});
  const [n, setN] = useState(0);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(true);
  const [progress, setProgress] = useState(0);

  // Initial user state
  const [user, setUser] = useState({
    // name: "Umid",
    // phone: "+998950934060",
    // balans: 50000,
    // surname: "",
    // level: 12,
    // bought: [
    //   {
    //     "id": 1,
    //     "username": "Madaminov Salohiddin",
    //     "job": "python, mobile application",
    //     "about": "anything",
    //     "direction": "python, mobile application",
    //     "experience": "4",
    //     "work_place": "Infinite Co",
    //     "img": "/media/user/Otabek-Nurmatov.webp",
    //     "slug": "madaminov-salohiddin"
    //   },
    // ],
    // proccess: 0, // Profil to'ldirilganlik foizi uchun key
  });

  // User malumotlarini localStorage-ga yozish
  useEffect(() => {
    localStorage.setItem("name", user.name);
    localStorage.setItem("phone", user.phone);
    localStorage.setItem("surname", user.surname);
    localStorage.setItem("level", user.level);
  }, [user]);

  // Profil to'ldirilganlik foizini hisoblaydigan funksiya
  const calculateProfileCompletion = (userObj) => {
    if (!userObj) return 0;
    const fields = ["name", "surname", "phone", "balans", "level"];
    const filledFieldsCount = fields.reduce((count, field) => {
      const value = userObj[field];
      if (value !== undefined && value !== null && value !== "") {
        return count + 1;
      }
      return count;
    }, 0);
    return Math.round((filledFieldsCount / fields.length) * 100);
  };

  return (
    <DataContext.Provider
      value={{
        n,
        setN,
        isFormComplete,
        setIsFormComplete,
        setCourse,
        course,
        setCourseData,
        courseData,
        user,
        setUser,
        data,
        setData,
        blogData,
        setBlogData,
        teacherData,
        setTeacherData,
        d,
        setD,
        setShowProfileForm,
        showProfileForm,
        progress,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
