import { useEffect } from "react";
import { useData } from "../../datacontect";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks";
import { EditOutlined } from "@ant-design/icons";
import Reception from "../reception/index"; // reception joylashgan joyi

const Profilim = () => {
  const navigate = useNavigate();
  const context = useData();
  if (!context) {
    return <div>Loading...</div>;
  }
  const {
    user,
    data,
    setTeacherData,
    teacherData,
    setCourseData,
    courseData,
    showProfileForm,
    setShowProfileForm,
    n,
    progress,
  } = context;

  const axios = useAxios();
  const url = "https://api.myrobo.uz";
  const token = localStorage.getItem("token");

  useEffect(() => {
    user.proccess = n;
    axios({ url: "/api/teacher/", method: "GET" })
      .then((data) => setTeacherData(data))
      .catch((error) => console.log(error));
  }, [axios, setTeacherData]);

  useEffect(() => {
    axios({ url: "/api/courses/", method: "GET" })
      .then((data) => setCourseData(data))
      .catch((error) => console.log(error));
  }, [axios, setCourseData]);

  const postId = (id) => {
    const chioseData = data.find((item) => item?.id === id);

    if (!token) {
      navigate(`/kirish2/`, { state: { id } });
    } else {
      navigate(`/frontned/`, { state: { id } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-4 md:p-8 text-gray-800 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold mb-2">
          Salom, <span className="text-blue-500">{user.name}</span>
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Boshqaruv paneliga xush kelibsiz
        </p>

        <button
          onClick={() => setShowProfileForm(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          <EditOutlined />
          Profilni to‘ldirish
        </button>

        {/* Progress bar */}
        <div className="w-full mt-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Profil to‘ldirilganlik darajasi</span>
            <span>{user.proccess ?? 0}%</span>
          </div>
          <div className="w-full h-2 bg-blue-100 rounded overflow-hidden">
            <div
              className="h-2 bg-blue-500 rounded transition-all duration-500"
              style={{ width: `${user.proccess ?? 0}%` }}
            ></div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 bg-white rounded-xl shadow overflow-auto">
        <h1 className="text-4xl font-bold border-b pb-4 mb-6">Boshlash</h1>

        {/* Mening kurslarim */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Mening kurslarim</h2>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {user.bought.map((e) => (
              <Link
                to="/team2"
                state={{ name: e.slug }}
                key={e.slug}
                className="block w-full max-w-xs md:w-[300px]"
              >
                <div className="bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden border p-4 transition-all">
                  <img
                    src={url + e.img}
                    alt={e.username}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <div className="font-semibold text-lg">{e.username}</div>
                  <div className="text-sm text-gray-500">{e.job}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mashxur kurslar */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Mashxur kurslar</h2>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {courseData?.map((course) => (
              <div
                key={course.slug}
                className="bg-white w-full max-w-xs md:w-[300px] shadow-md hover:shadow-xl rounded-xl overflow-hidden border p-4"
              >
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="font-semibold text-lg h-[60px]">{course.title}</div>
                <div className="text-sm text-gray-600">Narxi: {course.price} so‘m</div>
                <div className="mt-3">
                  <button
                    onClick={() => postId(course.id)}
                    className="border border-gray-500 px-3 py-1 rounded hover:bg-gray-100 w-full"
                  >
                    Batafsil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Reception modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowProfileForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
              aria-label="Close modal"
            >
              ✕
            </button>
            <Reception a={setShowProfileForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profilim;
