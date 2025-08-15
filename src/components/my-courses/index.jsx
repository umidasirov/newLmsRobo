import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Empty } from "antd"; // Empty komponentini qo'shdik
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks";
import { useData } from "../../datacontect";
function MeningKurslarim() {
  const [activeCard, setActiveCard] = useState(null);
  const axios = useAxios();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { data } = useData();
  // useEffect(() => {
  //   setLoad(true);
  //   axios({
  //     url: "/api/courses/",
  //     method: "GET",
  //   })
  //     .then((data) => {
  //       setData(data)
  //       setLoad(false);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const postId = (id) => {
    navigate(`/frontned/`, { state: { id: id } });
  };

  const truncateDescription2 = (text, limit = 27) => {
    const words = text.split(" ");
    return (
      words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "")
    );
  };

  const paidCourses = data?.filter((value) => value?.paid === true);
  if (load) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
        <span className="text-blue-500 font-semibold">Yuklanmoqda...</span>
      </div>
    )
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
                {/* Kurs kartasi kontenti */}
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
                      <span className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#098CE9"
                          width="16px"
                          height="16px"
                          viewBox="0 0 256 256"
                          id="Flat"
                        >
                          <path d="M227.79492,52.61621l-96-32a11.98464,11.98464,0,0,0-7.58984,0L28.44678,52.53564l-.05078.01685-.19092.06372c-.17383.05786-.34107.12793-.51074.19312-.20118.07739-.40052.15722-.5962.24487-.24487.10962-.48706.22339-.72216.34814-.11817.06275-.23181.13233-.34766.199-.199.11426-.39526.23144-.58618.3562-.10938.07153-.21655.14551-.32361.2207q-.295.20655-.575.42993c-.09009.07154-.18091.14185-.26892.21607q-.33453.282-.64575.58691c-.04444.04346-.09192.0835-.13575.12744q-.37243.375-.70947.78077c-.06335.07592-.12109.15625-.18249.23364-.15516.1958-.30579.39453-.44837.59961-.07861.11279-.15332.22778-.228.34326q-.175.271-.33483.55127c-.07264.12671-.14551.25268-.21363.38257-.10583.20166-.20251.40844-.297.61645-.05225.115-.10987.22657-.15845.34351-.12842.30835-.24243.62353-.34522.94311-.04187.13086-.07544.2649-.113.39746-.06128.21656-.1189.43384-.16822.65455-.03125.14062-.05908.28222-.08545.4248-.04345.23462-.07861.47119-.10839.71-.01526.124-.03321.24732-.04468.37256C20.02209,63.2583,20,63.627,20,64v80a12,12,0,0,0,24,0V80.64868l23.7146,7.905a67.90093,67.90093,0,0,0,18.11377,84.73047,99.97006,99.97006,0,0,0-41.64819,36.16016,12.00007,12.00007,0,0,0,20.10351,13.10937,76.02217,76.02217,0,0,1,127.43213,0,12.00007,12.00007,0,0,0,20.10352-13.10937,99.97238,99.97238,0,0,0-41.64783-36.16016A67.9008,67.9008,0,0,0,188.2854,88.55371l39.50952-13.16992a11.99952,11.99952,0,0,0,0-22.76758ZM128,44.64941,186.05273,64l-20.70739,6.90234-.03272.011L128,83.35059,90.68677,70.91309l-.02844-.00953L69.94727,64ZM172,120A44,44,0,1,1,90.93738,96.29443l33.2677,11.08936a11.99358,11.99358,0,0,0,7.58984,0l33.2677-11.08936A43.87528,43.87528,0,0,1,172,120Z"></path>
                        </svg>
                        <p>
                          <span>{value?.student_count}</span> O'quvchilar
                        </p>
                      </span>
                      <span className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M9.33317 1.83331H3.99984C3.64622 1.83331 3.30708 1.97379 3.05703 2.22384C2.80698 2.47389 2.6665 2.81302 2.6665 3.16665V13.8333C2.6665 14.1869 2.80698 14.5261 3.05703 14.7761C3.30708 15.0262 3.64622 15.1666 3.99984 15.1666H11.9998C12.3535 15.1666 12.6926 15.0262 12.9426 14.7761C13.1927 14.5261 13.3332 14.1869 13.3332 13.8333V5.83331L9.33317 1.83331Z"
                            stroke="#098CE9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M9.3335 1.83331V5.83331H13.3335"
                            stroke="#098CE9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M10.6668 9.16669H5.3335"
                            stroke="#098CE9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M10.6668 11.8333H5.3335"
                            stroke="#098CE9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M6.66683 6.5H6.00016H5.3335"
                            stroke="#098CE9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <p>
                          <span>{value?.lesson_bigs.length}</span> Darsliklar
                        </p>
                      </span>
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
                          {truncateDescription2(value?.description)}
                        </p>
                        <div className="flex justify-between text-sm text-gray-500 mb-6">
                          <span className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#098CE9"
                              width="16px"
                              height="16px"
                              viewBox="0 0 256 256"
                              id="Flat"
                            >
                              <path d="M227.79492,52.61621l-96-32a11.98464,11.98464,0,0,0-7.58984,0L28.44678,52.53564l-.05078.01685-.19092.06372c-.17383.05786-.34107.12793-.51074.19312-.20118.07739-.40052.15722-.5962.24487-.24487.10962-.48706.22339-.72216.34814-.11817.06275-.23181.13233-.34766.199-.199.11426-.39526.23144-.58618.3562-.10938.07153-.21655.14551-.32361.2207q-.295.20655-.575.42993c-.09009.07154-.18091.14185-.26892.21607q-.33453.282-.64575.58691c-.04444.04346-.09192.0835-.13575.12744q-.37243.375-.70947.78077c-.06335.07592-.12109.15625-.18249.23364-.15516.1958-.30579.39453-.44837.59961-.07861.11279-.15332.22778-.228.34326q-.175.271-.33483.55127c-.07264.12671-.14551.25268-.21363.38257-.10583.20166-.20251.40844-.297.61645-.05225.115-.10987.22657-.15845.34351-.12842.30835-.24243.62353-.34522.94311-.04187.13086-.07544.2649-.113.39746-.06128.21656-.1189.43384-.16822.65455-.03125.14062-.05908.28222-.08545.4248-.04345.23462-.07861.47119-.10839.71-.01526.124-.03321.24732-.04468.37256C20.02209,63.2583,20,63.627,20,64v80a12,12,0,0,0,24,0V80.64868l23.7146,7.905a67.90093,67.90093,0,0,0,18.11377,84.73047,99.97006,99.97006,0,0,0-41.64819,36.16016,12.00007,12.00007,0,0,0,20.10351,13.10937,76.02217,76.02217,0,0,1,127.43213,0,12.00007,12.00007,0,0,0,20.10352-13.10937,99.97238,99.97238,0,0,0-41.64783-36.16016A67.9008,67.9008,0,0,0,188.2854,88.55371l39.50952-13.16992a11.99952,11.99952,0,0,0,0-22.76758ZM128,44.64941,186.05273,64l-20.70739,6.90234-.03272.011L128,83.35059,90.68677,70.91309l-.02844-.00953L69.94727,64ZM172,120A44,44,0,1,1,90.93738,96.29443l33.2677,11.08936a11.99358,11.99358,0,0,0,7.58984,0l33.2677-11.08936A43.87528,43.87528,0,0,1,172,120Z"></path>
                            </svg>
                            <p>
                              <span>{value?.student_count} </span>
                              O'quvchilar
                            </p>
                          </span>
                          <span className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                d="M9.33317 1.83331H3.99984C3.64622 1.83331 3.30708 1.97379 3.05703 2.22384C2.80698 2.47389 2.6665 2.81302 2.6665 3.16665V13.8333C2.6665 14.1869 2.80698 14.5261 3.05703 14.7761C3.30708 15.0262 3.64622 15.1666 3.99984 15.1666H11.9998C12.3535 15.1666 12.6926 15.0262 12.9426 14.7761C13.1927 14.5261 13.3332 14.1869 13.3332 13.8333V5.83331L9.33317 1.83331Z"
                                stroke="#098CE9"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9.3335 1.83331V5.83331H13.3335"
                                stroke="#098CE9"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M10.6668 9.16669H5.3335"
                                stroke="#098CE9"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M10.6668 11.8333H5.3335"
                                stroke="#098CE9"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M6.66683 6.5H6.00016H5.3335"
                                stroke="#098CE9"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                            <p>
                              <span>{value?.lesson_bigs.length}</span>{" "}
                              Darsliklar
                            </p>
                          </span>
                        </div>
                      </div>
                      <Button
                        type="primary"
                        block
                        className="mt-auto"
                        onClick={() => {
                          navigate("/kirish2");
                          postId(value?.id);
                        }}
                      >
                        Boshlash
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center  justify-center py-20 gap-[30px] w-full">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 120,
                }}
              ></Empty>
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
