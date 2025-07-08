import React from "react";
import { motion } from "framer-motion";

function SertificateComponents() {
  // Animatsiya variantlari
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="bg-[#f1f2f7] py-[30px] mt-[20px] bgnone"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="w-[90%] m-auto">
        <div className="flex items-center justify-between gap-[30px] max-[768px]:flex max-[768px]:flex-col bgBlock max-[768px]:shadow-lg max-[768px]:shadow-blue-300 ">
          <motion.div
            className="flex items-center gap-5 "
            variants={itemVariants}
          >
            <div className="w-[80px] h-[80px] bg-[#fff] rounded-[100%] flex items-center justify-center shadow-md shadow-blue-300 max-[768px]:w-[70px] max-[768px]:h-[70px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 28H1.33334V10.6667M30.6667 16V10.6667M30.6667 10.6667V2.66669H1.33334V10.6667M30.6667 10.6667H1.33334M5.33334 6.66669H5.46668M9.33334 6.66669H9.46668M13.3333 6.66669H13.4667M18.6667 20.9697L23.3333 22.6667L28 20.9697M18.6667 20.9697L16 20L23.3333 16L30.6667 20L28 20.9697M18.6667 20.9697V25.3334L23.3333 28L28 25.3334V20.9697"
                  stroke="#098CE9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-[22px] font-medium text-[#000] max-[480px]:text-[19px] max-[768px]:font-medium">
                IT kurslari
              </h1>
              <p className="text-gray-500 text-[17px] max-[768px]:text-[14px]">
                Dasturlash va texnologiyalarni o‘rganing, kelajak kasbingizni
                yarating
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-5"
            variants={itemVariants}
          >
            <div className="w-[80px] h-[80px] bg-[#fff] rounded-[100%] flex items-center justify-center shadow-md shadow-blue-300 max-[768px]:w-[70px] max-[768px]:h-[70px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 28H1.33334V10.6667M30.6667 16V10.6667M30.6667 10.6667V2.66669H1.33334V10.6667M30.6667 10.6667H1.33334M5.33334 6.66669H5.46668M9.33334 6.66669H9.46668M13.3333 6.66669H13.4667M18.6667 20.9697L23.3333 22.6667L28 20.9697M18.6667 20.9697L16 20L23.3333 16L30.6667 20L28 20.9697M18.6667 20.9697V25.3334L23.3333 28L28 25.3334V20.9697"
                  stroke="#098CE9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-[22px] font-medium text-[#000] max-[480px]:text-[19px] max-[768px]:font-medium">
                Mutaxassislik kurslari
              </h1>
              <p className="text-gray-500 text-[17px] max-[768px]:text-[14px]">
                IT sohasidagi chuqur bilimlarni o‘zlashtiring va tajribangizni
                oshiring
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-5"
            variants={itemVariants}
          >
            <div className="w-[80px] h-[80px] bg-[#fff] rounded-[100%] flex items-center justify-center shadow-md shadow-blue-300 max-[768px]:w-[70px] max-[768px]:h-[70px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
              >
                <g clipPath="url(#clip0_1417_2033)">
                  <path
                    d="M30.9999 21.6141C30.9999 21.7559 30.974 21.9005 30.9654 22.043C30.776 24.7059 30.1214 26.7076 28.933 28.3518C28.2268 29.299 27.3483 30.0318 26.246 30.5679C25.9704 30.7109 25.712 30.693 25.402 30.55C23.3695 29.5671 22.026 27.8514 21.2682 25.3136C20.9237 24.1876 20.717 22.9723 20.7342 21.5783C22.405 20.7205 24.0929 19.8448 25.7465 18.969C25.7809 18.9512 25.8154 18.9333 25.8326 18.9333C25.867 18.9333 25.8843 18.9512 25.9359 18.969L27.5034 19.7911C28.6441 20.3732 30.0871 21.0958 30.9999 21.6141Z"
                    stroke="#098CE9"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M19.2667 30.6666H1.66669V1.33331H28.0667V14.5333M7.53335 7.19998H13.4M7.53335 13.0666H22.2M7.53335 18.9333H16.3334M7.53335 24.8H16.3334"
                    stroke="#098CE9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_1417_2033">
                    <rect
                      width="32"
                      height="32"
                      fill="white"
                      transform="translate(0.333374)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-[22px] font-medium text-[#000] max-[480px]:text-[19px] max-[768px]:font-medium">
                Sertifikatlangan kurslar
              </h1>
              <p className="text-gray-500 text-[17px] max-[768px]:text-[14px]">
                Tan olingan sertifikatlarga ega bo‘lib, IT bo‘yicha professional
                bo‘ling.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default SertificateComponents;
