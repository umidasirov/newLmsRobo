import { useEffect } from "react";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks";
import { useBlog } from "../../context/BlogContext";

function BlogComponents() {
  const axios = useAxios();
  const navigate = useNavigate();
  const { blogPosts, setBlogPosts } = useBlog();

  useEffect(() => {
    axios({
      url: "/api/blog/",
      method: "GET",
    })
      .then((data) => setBlogPosts(data))
      .catch((error) => console.log(error));
  }, [axios, setBlogPosts]);

  const truncateDescription = (text, limit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
  };

  const truncateDescription2 = (text, limit = 8) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const month = date.getMonth() + 1; // 0-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const postId = (slug) => {
    navigate(`/blog/${slug}`, { state: { name: slug } });
  };

  const url = "https://api.myrobo.uz";

  return (
    <section className="w-[90%] m-auto mt-[40px]">
      <div className=" grid grid-cols-2 gap-[25px] w-full max-[1081px]:grid-cols-1">
        {blogPosts?.map((value) => (
          <div
            className="w-full"
            onClick={() => postId(value?.slug)}
            key={value?.id}
          >
            <div className="bg-[#f1f2f7] flex items-center justify-between gap-[20px] p-5 rounded-lg w-full max-[540px]:flex-col hover:shadow-xl transition-shadow duration-800 cursor-pointer">
              <div className="w-full h-[270px]">
                <img
                  className="rounded-lg w-full h-full object-cover"
                  src={`${url}/${value?.img}`}
                  alt="This is image"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[19px] font-bold">
                    {truncateDescription2(value?.title)}
                  </h3>
                </div>
                <p className="text-[15px] text-gray-500">Blog</p>
                <p className="text-[15px] text-gray-500">
                  {truncateDescription(value?.description)}
                </p>
                <div className="flex flex-col gap-5">
                  <div className="border border-gray-400"></div>
                  <div className="flex  gap-[40px]">
                    <div className="flex items-center gap-2">
                      <div className="w-[25px] h-[25px] bg-[#525254] rounded-full flex items-center justify-center text-[#fff]">
                        <EyeOutlined />
                      </div>
                      <p className="text-[17px] text-gray-500">
                        {value?.views}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-[25px] h-[25px] bg-[#525254] rounded-full flex items-center justify-center text-[#fff]">
                        <CalendarOutlined />
                      </div>
                      <p className="text-[17px] text-gray-500">
                        {formatDate(value?.date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogComponents;
