import {
  UserOutlined,
  BookOutlined,
  IdcardOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import { useEffect } from "react";
import { useData } from "../../datacontect";
import { Link } from "react-router-dom";
import { div } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks";
const Profilim = () => {
  const navigate = useNavigate()
  const { user,setTeacherData,teacherData,setCourseData,courseData } = useData();

  const telefon = user.phone || localStorage.getItem("phone");
  const balans = localStorage.getItem("balance");
  console.log(user);
  const url = "https://api.myrobo.uz";
  const axios = useAxios();
  useEffect(() => {
    axios({
      url: "/api/teacher/",
      method: "GET",
    })
      .then((data) => setTeacherData(data))
      .catch((error) => console.log(error));
  }, [axios, setTeacherData]);

  useEffect(() => {
    axios({
      url: "/api/courses/",
      method: "GET",
    })
      .then((data) => setCourseData(data))
      .catch((error) => console.log(error));
  }, [axios, setCourseData]);
  const postID = (slug) => {
    navigate(`/team2/`, { state: { name: slug } });
  };
  console.log();
  
  console.log(courseData);

  return (
    <div className="m-center flex overflow-hidden px-8 text-gray-80 w-full h-full h-[100rem] w-[80%] max-sm:flex-col">
      {/* sidebar */}
      <div className="sidebar text-center p-8">
        <h1 className="text-[30px]">Salom, <span className="text-blue-400">{user.name}</span></h1>
        <p className="text-[15px] border-b border-grey-200 pb-4 mb-10">Boshqaruv paneliga xush kelibsiz</p>
        <div className="profile-com">
          <div className="flex w-full justify-between"><div>Profilni toldirish</div> <div>{user.proccess}%</div></div>
          <div className="border rounded w-full h-[10px] bg-blue-100">
            <div className={`w-[${user.proccess}%] rounded bg-blue-500 h-full`}></div>
          </div>
        </div>
      </div>
      {/* get start */}
      <div className="main-profile-content w-[80%] max-sm:w-full border-l border-gray-200 p-6" >
        <h1 className="start text-[50px] border-b border-grey-200 mb-5 pb-4">Boshlash</h1>

        <h1 className="start text-[30px] mb-5 pb-4">Mening kurslarim</h1>

        {user.bought.map((e) => (
          <Link
            to="/team2"
            state={{ name: e.slug }}
            key={e.slug}
            className="block w-[300px]"
          >
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-200 p-4 mb-6">
              <img
                src={url + e.img}
                alt={e.username}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="text-gray-800 text-xl font-semibold mb-1">{e.username}</div>
              <div className="text-gray-600 mb-2">
                <div className="text-sm">{e.job}</div>
                <div className="text-sm">
                  Tajriba: <span className="font-medium text-gray-800">+{e.experience} yil</span>
                </div>
              </div>
              <div className="text-gray-700 text-sm italic mb-3">{e.about}</div>
              <div className="text-gray-500 text-sm">
                Ish joyi: <span className="font-semibold text-gray-700">{e.work_place}</span>
              </div>
              <div className="text-center p-1">
                <div className="center border border-gray-500 rounded p-1 text-gray-500">
                  To‘liq...
                </div>
              </div>
            </div>
          </Link>
        ))}

        <h1 className="start text-[30px] mb-5 pb-4">Mashxur kurslar</h1>

        <div className="flex flex-wrap gap-6">
          {courseData?.map((course) => (
            <div
              key={course.slug}
              className="bg-white w-[300px] max-sm:w-full shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-200 p-4"
            >
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="text-gray-800 text-xl font-semibold mb-1">{course.title}</div>
              <div className="text-gray-600 mb-2">
                <div className="text-sm">Narxi: {course.price} so‘m</div>
                <div className="text-sm">Daraja: {course.level}</div>
              </div>
              <div className="text-gray-500 text-sm italic">{course.description?.slice(0, 80)}...</div>
              <div className="text-center mt-3">
                <Link
                  to={`/course/${course.slug}`}
                  className="inline-block border border-gray-500 rounded px-3 py-1 text-gray-500 hover:bg-gray-100"
                >
                  Batafsil
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profilim;
