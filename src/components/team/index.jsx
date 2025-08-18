import { Button } from "antd";
import { useAxios } from "../../hooks";
import { useEffect } from "react";
import { useData } from "../../datacontect";
import { useNavigate } from "react-router-dom";

function TeamComponents() {
  const axios = useAxios();
  const navigate = useNavigate();
  
  const { teacherData, setTeacherData } = useData();

  useEffect(() => {
    axios({
      url: `/api/teacher/`,
      method: "GET",
    })
      .then((data) => 
        {setTeacherData(data)
        }
    )
      .catch((error) => console.log(error));
  }, []);

  const url = "https://api.myrobo.uz";

  const postID = (slug) => {
    navigate(`/team2/`, { state: { name: slug } });
  };

  return (
    <section className="w-[90%] mx-auto mt-[140px] mb-11 max-w-[1200px] max-[768px]:mt-[80px] max-[568px]:mt-[40px]">
      <div className="flex flex-col gap-[60px] items-center max-[768px]:gap-[35px]">
        <h1 className="text-[35px] font-bold text-center max-[768px]:text-[29px] max-[640px]:text-[24px] max-[480px]:text-[21px]">
          Professional <span className="text-blue-600">o'qtuvchilar</span> jamoasi
        </h1>

        <div className="w-full flex items-center justify-evenly flex-wrap">
          {teacherData?.map((e) => (
            <div
              key={e.slug}
              onClick={() => postID(e.slug)}
              className="bg-white shadow-md hover:shadow-xl m-2 transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-200 p-4 cursor-pointer"
            >
              <img
                src={`${url}/${e.img}`}
                alt={e.username}
                className="w-full h-[300px] object-cover rounded-xl mb-4"
              />
              <div className="text-gray-800 text-xl font-semibold mb-1">{e.username}</div>
              <div className="text-gray-600 mb-2">
                <div className="text-sm">{e.job}</div>
                <div className="text-sm">
                  Tajriba:{" "}
                  <span className="font-medium text-gray-800">+{e.experience} yil</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Ish joyi:{" "}
                <span className="font-semibold text-gray-700">{e.work_place}</span>
              </p>
              <div className="w-full text-center">
                <div className="w-full p-2 rounded text-[15px] text-gray-500 border border-gray-500 hover:bg-gray-100 transition">
                  Batafsil ko‘rish
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamComponents;
