import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [step, setStep] = useState(1); // Изменил начальное значение на 1
  const navigate = useNavigate(); // Исправил на useNavigate
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    verificationCode: '',
    mathAnswer: ''
  });
  const [errors, setErrors] = useState({});

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
    if (formData.mathAnswer !== '9') newErrors.mathAnswer = 'Noto\'g\'ri javob';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      // Здесь можно отправить запрос для получения кода подтверждения
    }
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Tasdiqlash kodi kiritilmadi' });
      return;
    }
    // Здесь можно отправить запрос для завершения регистрации
    alert('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
    navigate('/login'); // Перенаправление после успешной регистрации
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {step === 1 ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Ro'yxatdan o'tish</h1>
          
          <form onSubmit={handleSubmitStep1}>
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
              <label className="block text-gray-700 mb-2">9 x 1 = ?</label>
              <input
                type="text"
                name="mathAnswer"
                value={formData.mathAnswer}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.mathAnswer ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.mathAnswer && <p className="text-red-500 text-sm mt-1">{errors.mathAnswer}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Ro'yxatdan o'tish
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">Agar akkauntingiz bo'lsa, 
              <button onClick={() => navigate('/login')} className="text-blue-600 ml-1">
                Kirish
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Tasdiqlash</h1>
          
          <form onSubmit={handleSubmitStep2}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="verificationCode">Tasdiqlash kodingizni kiriting</label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.verificationCode ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.verificationCode && <p className="text-red-500 text-sm mt-1">{errors.verificationCode}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Tasdiqlash
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">Kodni olmadingizmi? 
              <button className="text-blue-600 ml-1">Qayta yuborish</button>
            </p>
          </div>
        </>
      )}

      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-center">Yordam kerakmi? 
          <span className="font-semibold"> Call center: +998123456789</span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;