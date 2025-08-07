import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const generateMathQuestion = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return {
    question: `${a} x ${b}`,
    answer: (a * b).toString()
  };
};

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    verificationCode: '',
    mathAnswer: ''
  });

  const [math, setMath] = useState({ question: '', answer: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { question, answer } = generateMathQuestion();
    setMath({ question, answer });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Ism kiritilmadi';
    if (!formData.lastName.trim()) newErrors.lastName = 'Familiya kiritilmadi';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon raqami kiritilmadi';
    if (!formData.password) newErrors.password = 'Parol kiritilmadi';
    if (formData.mathAnswer.trim() !== math.answer) newErrors.mathAnswer = 'Noto\'g\'ri javob';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      // Bu yerda kod yuborish logikasi bo'lishi mumkin
    }
  };
  let phone = localStorage.getItem("phone") || "";
  useEffect(() => {

    if (phone.startsWith("+998")) {
      phone = phone.slice(4);
    } else if (phone.startsWith("998")) {
      phone = phone.slice(3);
    }

    setFormData((prev) => ({
      ...prev,
      phone,
    }));
  }, []);



  console.log(phone);

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    if (!formData.verificationCode.trim()) {
      setErrors({ verificationCode: 'Tasdiqlash kodi kiritilmadi' });
      return;
    }

    alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 p-1">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Malumotlarni To‘ldirish</h1>

          <form onSubmit={handleSubmitStep1}>
            {/* Ism */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="firstName">Ism</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={localStorage.getItem("pay_status")}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Familiya */}
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

            {/* Telefon */}
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
                  value={phone}
                  onChange={handleChange}
                  placeholder="9x1234567"
                  className={`flex-1 px-3 py-2 border rounded-r-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>


            {/* Matematik savol */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">{math.question} = ?</label>
              <input
                type="text"
                name="mathAnswer"
                value={formData.mathAnswer}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.mathAnswer ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.mathAnswer && <p className="text-red-500 text-sm mt-1">{errors.mathAnswer}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Saqlash
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">Agar akkauntingiz bo‘lsa,
              <button onClick={() => navigate('/login')} className="text-blue-600 ml-1">Kirish</button>
            </p>
          </div>
        </>

        {/* Call center */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-center">Yordam kerakmi?
            <span className="font-semibold"> Call center: +998123456789</span>
          </p>
        </div>
      </div>
    </div>

  );
};

export default RegistrationForm;
