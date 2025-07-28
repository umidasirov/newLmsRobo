// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import Cookies from "js-cookie";
// import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
// import { useAxios } from "../../hooks";
// import notificationApi from "../../generic/notificition";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const axios = useAxios();
//   const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
//   const [status, setStatus] = useState("");
//   const [error, setError] = useState("");

//   const uuid = Cookies.get("my_uuid");
//   const access = localStorage.getItem("token");
//   const notify = notificationApi();
//   useEffect(() => {
//     if (!uuid) {
//       const newUUID = uuidv4();
//       Cookies.set("my_uuid", newUUID, { expires: 365 });
//       console.log("Yangi UUID:", newUUID);
//     } else {
//       console.log("Mavjud UUID:", uuid);
//     }
//   }, []);

//   useEffect(() => {
//     if (access) {
//       navigate("/");
//     }
//   }, [access, navigate]);

//   const telegramLink = `https://t.me/robologinbot?start=${uuid}`;

//   const handleDigitChange = (e, index) => {
//     const value = e.target.value.replace(/\D/, "").slice(0, 1);
//     const newDigits = [...codeDigits];
//     newDigits[index] = value;
//     setCodeDigits(newDigits);

//     if (value && index < codeDigits.length - 1) {
//       const nextInput = document.getElementById(`code-input-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !codeDigits[index]) {
//       const prevInput = document.getElementById(`code-input-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const pasteData = e.clipboardData.getData("Text").trim();
//     if (pasteData.length === 6 && /^\d{6}$/.test(pasteData)) {
//       const newDigits = pasteData.split("");
//       setCodeDigits(newDigits);
//       const lastInput = document.getElementById("code-input-5");
//       if (lastInput) lastInput.focus();
//       e.preventDefault();
//     }
//   };

//   const handleCodeSubmit = async () => {
//     const code = codeDigits.join("");
//     if (!code || code.length !== 6) {
//       setError("Iltimos, 6 xonali kodni to‘liq kiriting.");
//       return;
//     }

//     axios({
//       url: "/verify_code/",
//       method: "POST",
//       data: {
//         code,
//         uuid,
//       },
//     })
//       .then((data) => {
//         console.log(data);
//         if (data?.status === "success") {
//           notify({ type: "loginSuccses" });
//         }
//         localStorage.setItem("token", data?.token);
//         localStorage.setItem("balance", data?.user_balance);
//         localStorage.setItem("phone", data?.phone);
//         navigate("/registrate");
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
//         <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
//           <div className="mb-8 text-center">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <UserOutlined className="text-blue-600 text-2xl" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">Tizimga kirish</h1>
//             <p className="text-gray-500 mt-2">Tasdiqlash kodingizni kiriting</p>
//           </div>

//           <div className="w-full max-w-xs">
//             <div className="flex justify-between gap-2 mb-6">
//               {codeDigits.map((digit, idx) => (
//                 <input
//                   key={idx}
//                   id={`code-input-${idx}`}
//                   type="text"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleDigitChange(e, idx)}
//                   onKeyDown={(e) => handleKeyDown(e, idx)}
//                   onPaste={idx === 0 ? handlePaste : undefined}
//                   className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
//                 />
//               ))}
//             </div>

//             {(status || error) && (
//               <div
//                 className={`mb-4 p-3 rounded-lg text-sm ${
//                   error
//                     ? "bg-red-100 text-red-700"
//                     : "bg-blue-100 text-blue-700"
//                 }`}
//               >
//                 {error || status}
//               </div>
//             )}

//             <button
//               onClick={handleCodeSubmit}
//               className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition duration-200"
//             >
//               Kirish <ArrowRightOutlined />
//             </button>
//           </div>
//         </div>

//         <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex flex-col items-center justify-center text-center rounded-t-3xl md:rounded-l-none md:rounded-r-3xl">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold text-white mb-4">
//               MyRoboga Kirish
//             </h1>
//             <p className="text-blue-100 mb-6">
//               Tasdiqlash kodini olish uchun kiring:
//             </p>
//             <a
//               href={telegramLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition duration-200"
//             >
//               @robologinbot
//             </a>
//           </div>

//           <div className="mt-6 text-blue-200 text-sm">
//             <p>Agar sizda akkaunt bo'lmasa, bot orqali ro'yxatdan o'ting</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

































import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { useAxios } from "../../hooks";
import notificationApi from "../../generic/notificition";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [mathQuestion, setMathQuestion] = useState({ num1: 0, num2: 0, answer: 0 });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    verificationCode: "",
    mathAnswer: "",
  });

  const navigate = useNavigate();
  const axios = useAxios();
  const notify = notificationApi();

  // Get or Set UUID
  useEffect(() => {
    const existingUUID = Cookies.get("my_uuid");
    if (!existingUUID) {
      const newUUID = uuidv4();
      Cookies.set("my_uuid", newUUID, { expires: 365 });
      console.log("New UUID:", newUUID);
    } else {
      console.log("Existing UUID:", existingUUID);
    }
  }, []);

  const uuid = Cookies.get("my_uuid");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    generateMathQuestion();
  }, []);

  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; // 1 dan 10 gacha
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathQuestion({
      num1,
      num2,
      answer: num1 * num2, // ko‘paytirish, istasangiz qo‘shish ham bo‘lishi mumkin
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ism kiritilmadi";
    if (!formData.lastName.trim()) newErrors.lastName = "Familiya kiritilmadi";
    if (!formData.phone.trim()) newErrors.phone = "Telefon raqami kiritilmadi";
    if (!formData.password) newErrors.password = "Parol kiritilmadi";
    if (parseInt(formData.mathAnswer) !== mathQuestion.answer) { newErrors.mathAnswer = "Noto'g'ri javob"; }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitStep1 = async (e) => {
    // e.preventDefault(); 
    // if (!validateStep1()) return;

    // try {
    //   const response = await axios({
    //     url: "/register/",
    //     method: "POST",
    //     data: {
    //       first_name: formData.firstName,
    //       last_name: formData.lastName,
    //       phone: formData.phone,
    //       password: formData.password,
    //       uuid,
    //     },
    //   });

    //   if (response?.status === "success") {
    //     notify({ type: "success", text: "Kod yuborildi" });
    //     setStep(2);
    //   } else {
    //     notify({ type: "error", text: "Ro'yxatdan o'tishda xatolik" });
    //   }
    // } catch (err) {
    //   console.error(err);
    //   notify({ type: "error", text: "Server xatosi" });
    // }
    if (!validateStep1()) return;
    setStep(2)
  };


  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    if (!formData.verificationCode) {
      setErrors({ verificationCode: "Tasdiqlash kodi kiritilmadi" });
      return;
    }

    try {
      const response = await axios({
        url: "/verify_code/",
        method: "POST",
        data: {
          code: formData.verificationCode,
          uuid,
        },
      });

      if (response?.status === "success") {
        notify({ type: "loginSuccses" });
        localStorage.setItem("token", response?.token);
        localStorage.setItem("balance", response?.user_balance);
        localStorage.setItem("phone", response?.phone);
        navigate("/");
      } else {
        notify({ type: "error", text: "Kod noto'g'ri" });
      }
    } catch (err) {
      console.error(err);
      notify({ type: "error", text: "Server xatosi" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {step == 1 ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Ro'yxatdan o'tish</h1>
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="firstName">Ism</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="lastName">Familiya</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phone">Telefon raqami</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                    +998
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9x600007"
                    className={`flex-1 px-3 py-2 border rounded-r-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">Parol</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  {mathQuestion.num1} x {mathQuestion.num2} = ?
                </label>
                <input
                  type="text"
                  name="mathAnswer"
                  value={formData.mathAnswer}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.mathAnswer ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.mathAnswer && (
                  <p className="text-red-500 text-sm mt-1">{errors.mathAnswer}</p>
                )}
              </div>

              <button
                onClick={handleSubmitStep1}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Ro'yxatdan o'tish
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Akkauntingiz bormi?
                <button
                  onClick={() => setStep(2)}
                  className="text-blue-600 ml-1 underline"
                >
                  Kirish
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center mb-6 justify-between">
              <div className="flex-1">
                <button
                  onClick={() => setStep(1)}
                  className="border border-blue-600 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-100 transition"
                >
                  ← Orqaga
                </button>
              </div>
              <h1 className="flex-1 text-center text-2xl font-semibold text-gray-800">Tasdiqlash</h1>
              <div className="flex-1"></div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <label htmlFor="verificationCode" className="block text-gray-700 text-sm mb-2">
                Tasdiqlash kodingizni kiriting
              </label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 ${errors.verificationCode ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.verificationCode && (
                <p className="text-red-500 text-sm mt-1">{errors.verificationCode}</p>
              )}

              <button
                onClick={handleSubmitStep2}
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Tasdiqlash
              </button>

            </div>

            <div className="mt-6 text-center">
              <a
                href="https://t.me/robologinbot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 border border-blue-600 px-4 py-2 rounded-md mt-4 hover:bg-blue-50 transition"
              >
                Tasdiqlash ko'dinini Telegram orqali oling
              </a>
            </div>
          </>

        )}

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-center">
            Yordam kerakmi?
            <span className="font-semibold"> Call center: +998123456789</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
