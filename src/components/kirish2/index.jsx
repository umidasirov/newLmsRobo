import { useState } from "react";

import { CheckOutlined, CodeOutlined } from "@ant-design/icons";
import { useData } from "../../datacontect";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks";
import notificationApi from "../../generic/notificition";
function KirishComponentsID() {
  const { data } = useData();
  const location = useLocation();
  const { id } = location?.state;
  const axios = useAxios();
  const findData = data.find((item) => item?.id === id);
  const notify = notificationApi();

  const navigate = useNavigate();
  const url = "https://api.myrobo.uz";

  console.log(findData, "kndsyc");

  const token = localStorage.getItem("token");

  const postData = () => {
    if (!token) {
      notify({ type: "token" });
      return;
    }
  };

  const buyCourse = (id) => {
    if (!token) {
      notify({ type: "token" });
      return;
    }

    const data = {
      course_id: id,
    };

    console.log(data, "lknjbhuyt");
    axios({
      url: "/api/purchased-courses/",
      method: "POST",
      data,
    })
      .then((data) => {
        console.log(data);
        if (data?.message === "You have already purchased this course") {
          notify({ type: "buyCourses" });
        } else {
          notify({ type: "success" });
          navigate("/course-detail", { state: { id: findData.id } });
        }
      })
      .catch((error) => console.log(error));
  };

  console.log(findData, "xnsj");

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="w-[90%] m-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl md:text-3xl font-semibold flex gap-2">
              Kurs O'qtuvchisi
              <span className="text-blue-600">
                {findData?.teacher?.username}
              </span>
            </h1>

            <div className="bg-orange-200 rounded-lg overflow-hidden p-6 md:p-10 shadow-lg">
              <img
                src={findData?.img}
                className="w-full object-contain mx-auto"
                alt="This is image"
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Tavsif</h2>
              <div className="text-gray-700 space-y-4">
                <p>{findData?.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Kurs davomida nimalarga ega bo'lasiz
              </h2>
              <div className="space-y-3">
                {findData?.course_accept?.map((value) => (
                  <div key={value?.id} className="flex items-start">
                    <CheckOutlined
                      className="text-green-500 mr-2 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <p className="text-gray-700">{value?.name}</p>
                  </div>
                ))}

                <div className="flex items-start">
                  <CheckOutlined
                    className="text-green-500 mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <p className="text-gray-700">Sertifikat</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {findData?.lesson_bigs?.map((value) => (
                <div>
                  <div className="bg-blue-900 text-white p-4 rounded-t-lg mt-6">
                    <h3 className="font-medium">{value?.title}</h3>
                  </div>
                  <div className="bg-white p-4 shadow-md rounded-b-lg">
                    <p
                      onClick={() => postData()}
                      className="text-gray-600 text-sm cursor-pointer"
                    >
                      {value?.title}
                    </p>
                    <button
                      onClick={() => postData()}
                      className="flex items-center text-blue-500 text-sm mt-2 hover:text-blue-700"
                    >
                      <CodeOutlined size={16} className="mr-1" />
                      code print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <img
                src={`${url}/${findData?.teacher?.img}`}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {findData?.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  Mentor: <span>{findData?.teacher?.username}</span>
                </p>

                <div className="border-t border-b py-4 my-4">
                  <p className="text-sm text-gray-500">Kurs narxi:</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold">
                      {findData?.price} so'm
                    </span>
                    <span className="text-gray-400 line-through ml-2 text-sm">
                      300000 so'm
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => buyCourse(findData?.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full py-3 font-medium transition duration-300 shadow-md"
                >
                  Sotib olish
                </button>

                <div className="flex justify-around mt-4">
                  <img
                    src="https://api.logobank.uz/media/logos_png/Uzcard-01.png"
                    alt="Payment method 1"
                    className="h-12 w-12 rounded-md"
                  />
                  <img
                    src="https://humocard.uz/upload/medialibrary/8cf/ia2yatyqt4l0p0d5523erhmx6y0fssxw/HumoPay-Final-002.png"
                    alt="Payment method 2"
                    className="h-12 w-12 rounded-md"
                  />
                  <img
                    src="https://pr.uz/wp-content/uploads/2024/05/photo_2024-05-14_20-27-31.jpg"
                    alt="Payment method 3"
                    className="h-12 w-12 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KirishComponentsID;
