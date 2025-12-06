import { useState, useEffect } from "react";
import { useData } from "../../datacontect";
import { useNavigate } from "react-router-dom";

const generateMathQuestion = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return {
    question: `${a} x ${b}`,
    answer: (a * b).toString(),
  };
};

const RegistrationForm = ({ a }) => {
  const navigate = useNavigate();
  const { setUser } = useData();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    mathAnswer: "",
  });

  const [math, setMath] = useState({ question: "", answer: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMath(generateMathQuestion());

    let phone = localStorage.getItem("phone") || "";
    if (phone.startsWith("+998")) phone = phone.slice(4);
    else if (phone.startsWith("998")) phone = phone.slice(3);

    setFormData({
      firstName: localStorage.getItem("name") || "",
      lastName: localStorage.getItem("surname") || "",
      phone,
      password: "",
      mathAnswer: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ism kiritilmadi";
    if (!formData.lastName.trim()) newErrors.lastName = "Familiya kiritilmadi";
    if (!formData.phone.trim()) newErrors.phone = "Telefon raqami kiritilmadi";
    if (!formData.password) newErrors.password = "Parol kiritilmadi";
    if (formData.mathAnswer.trim() !== math.answer)
      newErrors.mathAnswer = "Noto‘g‘ri javob";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser = {
      name: formData.firstName,
      lastname: formData.lastName,
      phone: "+998" + formData.phone,
      password: formData.password,
      balans: 50000,
      level: 1,
      bought: [],
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    navigate("/login");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-md p-5 relative">
        {/* Close button */}
        <button
          onClick={() => a(false)}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-xl sm:text-2xl font-bold z-50"
          style={{ lineHeight: 1 }}
        >
          ×
        </button>

        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Ma'lumotlarni To‘ldirish
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
          {/* Ism */}
          <div>
            <label className="block mb-1 font-medium">Ism</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Ismingizni kiriting"
            />
            {errors.firstName && (
              <p className="text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Familiya */}
          <div>
            <label className="block mb-1 font-medium">Familiya</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Familiyangizni kiriting"
            />
            {errors.lastName && (
              <p className="text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Telefon */}
          <div>
            <label className="block mb-1 font-medium">Telefon raqami</label>
            <div className="flex">
              <span className="px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md select-none text-gray-600">
                +998
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="XX XXX XX XX"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Parol */}
          <div>
            <label className="block mb-1 font-medium">Parol</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Parolingizni kiriting"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Matematik savol */}
          <div>
            <label className="block mb-1 font-medium">{math.question} = ?</label>
            <input
              type="text"
              name="mathAnswer"
              value={formData.mathAnswer}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.mathAnswer
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Javobni kiriting"
            />
            {errors.mathAnswer && (
              <p className="text-red-500 mt-1">{errors.mathAnswer}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Saqlash
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
