import { CalendarOutlined } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";

import {
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useData } from "../../datacontect";
function BlogComponentsId() {
  const { blogData } = useData();

  const location = useLocation();
  const name = location?.state?.name;

  const findData = blogData?.find((item) => item?.slug === name);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const month = date.getMonth() + 1; // 0-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const url = "https://api.myrobo.uz";
  return (
    <section className="w-[90%] m-auto mt-[40px]">
      <div className="w-full flex flex-col gap-[40px] max-[500px]:gap-[25px]">
        <div className="w-full flex flex-col gap-[20px] ">
          <img
            className="w-full h-[500px] object-cover rounded-2xl"
            src={`${url}/${findData?.img}`}
            alt=""
          />
          <div className=" gap-[40px] hidden max-[700px]:flex max-[524px]:justify-end">
            <div className="flex items-center gap-2">
              <div className="w-[25px] h-[25px] bg-[#525254] rounded-full flex items-center justify-center text-[#fff]">
                <EyeOutlined />
              </div>
              <p className="text-[17px] text-gray-500">{findData?.views}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[25px] h-[25px] bg-[#525254] rounded-full flex items-center justify-center text-[#fff]">
                <CalendarOutlined />
              </div>
              <p className="text-[17px] text-gray-500">
                {formatDate(findData?.date)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[40px] max-[500px]:gap-[20px]">
          <div className="flex items-end justify-between gap-[40px] ">
            <h1 className="text-[29px] font-bold max-[768px]:text-[22px] max-[590px]:text-[17px]">
              {findData?.title}
            </h1>

            <div className="flex  gap-[40px] max-[700px]:hidden">
              <div className="flex items-center gap-2">
                <div className="w-[25px] h-[25px] bg-[#525254] rounded-full flex items-center justify-center text-[#fff]">
                  <EyeOutlined />
                </div>
                <p className="text-[17px] text-gray-500">{findData?.views}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[25px] h-[25px] bg-[#525254] rounded-full flex items-center justify-center text-[#fff]">
                  <CalendarOutlined />
                </div>
                <p className="text-[17px] text-gray-500">
                  {formatDate(findData?.date)}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-[30px]">
            <p className="text-[17px] text-gray-600 max-[590px]:text-[15px] max-[490px]:text-[13px]">
              {findData?.description}
            </p>

            <div className="flex items-center gap-[20px] max-[524px]:justify-center">
              <div className="w-[45px] cursor-pointer h-[45px] p-3 rounded-full  shadow-md shadow-blue-300 flex items-center justify-center text-[22px] hover:bg-blue-600 hover:text-[#FFF] transition-all duration-300 ">
                <FaTelegramPlane />
              </div>
              <div className="w-[45px] cursor-pointer h-[45px] p-3 rounded-full  shadow-md shadow-blue-300 flex items-center justify-center text-[22px] hover:bg-blue-600 hover:text-[#FFF] transition-all duration-300">
                <FaInstagram />
              </div>
              <div className="w-[45px] cursor-pointer h-[45px] p-3 rounded-full  shadow-md shadow-blue-300 flex items-center justify-center text-[22px] hover:bg-blue-600 hover:text-[#FFF] transition-all duration-300 ">
                <FaYoutube />
              </div>
              <div className="w-[45px] h-[45px] cursor-pointer p-3 rounded-full  shadow-md shadow-blue-300 flex items-center justify-center text-[22px] hover:bg-blue-600 hover:text-[#FFF] transition-all duration-300">
                <FaFacebookF />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogComponentsId;
