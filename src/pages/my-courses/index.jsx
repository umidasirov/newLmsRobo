import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import { useAxios } from "../../hooks";

function MeningKurslarim() {
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();
  const { courses, setCourses } = useCourses();
  const axios = useAxios();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      url: "/api/courses/",
      method: "GET",
    })
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [axios, setCourses]);

  const postId = (id) => {
    navigate(`/frontend/`, { state: { id: id } });
  };

  const truncateDescription = (text, limit = 27) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
  };

  const paidCourses = courses?.filter((value) => value?.paid === true);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
        <span className="text-blue-500 font-semibold">Yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <section className="w-[90%] m-auto max-[768px]:mt-[30px]">
      <div>
        <h1 className="text-center py-[40px] font-bold text-[22px] max-[768px]:py-[20px]">
          Mening kurslarim
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {paidCourses?.length > 0 ? (
            paidCourses.map((value) => (
              <div
                key={value?.id}
                className="relative w-[300px] h-[400px] rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => setActiveCard(value?.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="h-full flex flex-col">
                  <div className="h-[180px] overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={value?.img}
                      alt={value?.title}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col bg-white">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-blue-100 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Bepul</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2">
                      {value?.title}
                    </h3>
                    <div className="flex justify-between mt-auto text-gray-500 text-sm">
                      {/* ... iconlar va boshqa ma'lumotlar ... */}
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {activeCard === value?.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-white p-5 flex flex-col z-10 shadow-2xl"
                    >
                      <div className="mb-4 p-2 bg-blue-50 rounded-md">
                        <h3 className="text-lg font-bold text-center">
                          {value?.title}
                        </h3>
                      </div>
                      <div className="flex-1 overflow-y-auto">
                        <p className="text-gray-700 mb-4">
                          {truncateDescription(value?.description)}
                        </p>
                        {/* ... iconlar va boshqa ma'lumotlar ... */}
                      </div>
                      <Button
                        type="primary"
                        block
                        className="mt-auto"
                        onClick={() => postId(value?.id)}
                      >
                        Boshlash
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-[30px] w-full">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 120 }}
              />
              <span className="text-lg text-center">
                Sizda hozircha sotib olingan kurslar mavjud emas
              </span>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/kurslar")}
              >
                Kurslarni ko'rish
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MeningKurslarim;
