import React from "react";
import opani_Rasmi from "../../assets/page_2.jpg";
import { motion } from "framer-motion";

const PremiumEducation = () => {
  const text_data = [
    "O'z tezligingiz bilan o'rganing",
    "Eng yaxshi mutaxassislardan o'rganing",
    "Bilim va g'oyalarni baham ko'ring",
    "Global ijodiy hamjamiyat bilan bog'langan",
  ];

  return (
    <section className="w-[90%] mx-auto py-10 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Text content - left side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          className="w-full md:w-1/2 min-w-0"
        >
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
              className="text-lg text-gray-600 font-medium text-center md:text-left"
            >
              PREMIUM TA'LIM
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className="text-2xl sm:text-3xl font-bold text-center md:text-left"
            >
              Eng Zamonaviy-Elektron
              <span className="text-blue-500"> Ta'lim Tajribasi</span>
            </motion.h1>

            <div className="space-y-3">
              {text_data.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: false }}
                  className="p-3 border-b border-gray-200 hover:bg-gray-50 hover:rounded-lg transition-all cursor-pointer"
                >
                  <p className="font-medium text-sm sm:text-base">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Image - right side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          className="w-full md:w-1/2 flex justify-center min-w-0"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="w-full max-w-[380px] sm:max-w-[500px]"
          >
            <img
              src={opani_Rasmi}
              alt="Premium ta'lim tasviri"
              className="w-full h-auto "
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumEducation;
