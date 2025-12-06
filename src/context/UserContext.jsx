import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Ilovani ishga tushirganda localStorage'dan ma'lumotlarni o'qish
    const savedName = localStorage.getItem("name");
    const savedPhone = localStorage.getItem("phone");
    const savedSurname = localStorage.getItem("surname");
    const savedLevel = localStorage.getItem("level");

    return {
      name: savedName || "",
      phone: savedPhone || "",
      surname: savedSurname || "",
      level: savedLevel || 0,
      balans: 50000, // Misol uchun, boshlang'ich balans
      bought: [],
    };
  });

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [progress, setProgress] = useState(0);

  // User ma'lumotlari o'zgarganda localStorage'ga yozish
  useEffect(() => {
    localStorage.setItem("name", user.name);
    localStorage.setItem("phone", user.phone);
    localStorage.setItem("surname", user.surname);
    localStorage.setItem("level", user.level);
    setProgress(calculateProfileCompletion(user));
  }, [user]);

  // Profil to'ldirilganlik foizini hisoblaydigan funksiya
  const calculateProfileCompletion = (userObj) => {
    if (!userObj) return 0;
    const fields = ["name", "surname", "phone"]; // Asosiy maydonlar
    const filledFieldsCount = fields.reduce((count, field) => {
      const value = userObj[field];
      if (value) {
        return count + 1;
      }
      return count;
    }, 0);
    return Math.round((filledFieldsCount / fields.length) * 100);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        showProfileForm,
        setShowProfileForm,
        progress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
