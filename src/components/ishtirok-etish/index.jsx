import { Button } from "antd";
import React from "react";
import logo from "../../assets/logo3.png";
import { useNavigate } from "react-router-dom";

function IshtirockComponents() {
  const navigate = useNavigate();
  return (
    <section className="w-[95%] max-w-6xl mx-auto bg-[#f1f2f7] rounded-3xl min-h-[300px] sm:h-[400px] flex items-center justify-center flex-col mb-8 sm:mb-11 mt-[120px] sm:mt-[180px] relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] xs:w-[100px] xs:h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] bg-white rounded-full flex items-center justify-center p-1 xs:p-2 shadow-[0_-4px_12px_rgba(128,128,128,0.3)]">
        <img
          className="w-full h-full object-contain"
          src={logo}
          alt="MYROBO logo"
        />
      </div>

      <div className="text-center px-3 xs:px-4 w-full mt-4 xs:mt-0">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-snug xs:leading-tight">
          <span className="block xs:inline">O'z kelajagingizni qurishni</span>
          <br className="xs:hidden" />
          <span className="block xs:inline">hoziroq boshlang!</span>
        </h1>
        <Button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/");
          }}
          type="primary"
          className="mt-4 xs:mt-6 md:mt-[40px] w-full max-w-[180px] xs:max-w-[200px] sm:max-w-[240px] h-10 xs:h-12 md:h-[60px] text-xs xs:text-sm md:text-base"
        >
          Ishtirok etish
        </Button>
      </div>
    </section>
  );
}

export default IshtirockComponents;
