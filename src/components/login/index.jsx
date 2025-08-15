import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useAxios } from "../../hooks";
import notificationApi from "../../generic/notificition";
import { useData } from "../../datacontect";

const LoginPage = () => {
  const navigate = useNavigate();

  const axios = useAxios();
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const uuid = Cookies.get("my_uuid");
  const access = localStorage.getItem("token");
  const notify = notificationApi();

  const { setD } = useData()
  useEffect(() => {
    if (!uuid) {
      const newUUID = uuidv4();
      Cookies.set("my_uuid", newUUID, { expires: 365 });
      console.log("Yangi UUID:", newUUID);
    } else {
      console.log("Mavjud UUID:", uuid);
    }
  }, []);

  useEffect(() => {
    if (access) {
      navigate("/");
    }
  }, [access, navigate]);

  const telegramLink = `https://t.me/robologinbot?start=${uuid}`;

  const handleDigitChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "").slice(0, 1);
    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < codeDigits.length - 1) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codeDigits[index]) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").trim();
    if (pasteData.length === 6 && /^\d{6}$/.test(pasteData)) {
      const newDigits = pasteData.split("");
      setCodeDigits(newDigits);
      const lastInput = document.getElementById("code-input-5");
      if (lastInput) lastInput.focus();
      e.preventDefault();
    }
  };

  const handleCodeSubmit = async () => {
    const code = codeDigits.join("");
    if (!code || code.length !== 6) {
      setError("Iltimos, 6 xonali kodni to‘liq kiriting.");
      return;
    }

    axios({
      url: "/verify_code/",
      method: "POST",
      data: {
        code,
        uuid,
      },
    })
      .then((data) => {
        console.log("User ku bu", data);
        if (data?.status === "success") {
          notify({ type: "loginSuccses" });
        }
        console.log("Serverdan kelgan data:", data);
        setD(data)
        localStorage.setItem("token", data?.token);
        localStorage.setItem("balance", data?.user_balance);
        const fetchUser = () => {
          console.log("ish boshlandi");

          axios({
            url: "/api/user-get/",
            method: "GET",
            headers: { Authorization: `Token ${token}` }
          })
            .then((data) => {
              console.log("GET-USER RESPONSE:", data);
              setUser(data); // 🔹 user state’ni yangilash
              console.log("User ku bu", data);
              if (data?.status === "success") {
                notify({ type: "loginSuccses" });
              }
              console.log("Serverdan kelgan data:", data);
              setD(data)
              localStorage.setItem("token", data?.token);
              localStorage.setItem("balance", data?.user_balance);
              localStorage.setItem("status", data?.pay_status);
            })
            .catch((err) => {
              console.error("GET-USER ERROR:", err);
            });
        };
        localStorage.setItem("status", data?.pay_status);
        navigate("/profilim");
      })
      .catch((error) => {
        console.log(error)
        notify({ type: "loginError" });
      }
      );

    axios({
      url: "/api/user-get/",
      method: "GET",
      headers: { Authorization: `Token ${token}` }
    })
      .then((data) => {
        console.log("GET-USER RESPONSE:", data);
        setUser(data); // 🔹 user state’ni yangilash
        console.log("User ku bu", data);
        if (data?.status === "success") {
          notify({ type: "loginSuccses" });
        }
        console.log("Serverdan kelgan data:", data);
        setD(data)
        localStorage.setItem("token", data?.token);
        localStorage.setItem("balance", data?.user_balance);
        localStorage.setItem("phone", data.phone_number);
        localStorage.setItem("status", data?.pay_status);
      })
      .catch((err) => {
        console.error("GET-USER ERROR:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full  p-8 flex flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserOutlined className="text-blue-600 text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Tizimga kirish</h1>
            <p className="text-gray-500 mt-2 w-[60%] mx-auto">
              <a
                href="https://t.me/robologinbot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 border border-blue-600 px-1 py-1 rounded-md mt-4 hover:bg-blue-50 transition"
              >@robologinbot</a> Telegram botiga kiring va 1 daqiqalik kodingizni oling.</p>
          </div>

          <div className=" max-w-xs">
            <div className="flex justify-between gap-2 mb-6">
              {codeDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`code-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              ))}
            </div>

            {(status || error) && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${error
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
                  }`}
              >
                {error || status}
              </div>
            )}

            <button
              onClick={handleCodeSubmit}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition duration-200"
            >
              Kirish <ArrowRightOutlined />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;