import React from "react";
import SwiperComponent from "../../components/swipper";
import SertificateComponents from "../../components/sertificate";
import KirishComponents from "../../components/kirish";
import KursToifalariComponents from "../../components/kurs-toifalar";
import PremiumEducation from "../../components/premium";
import AnimatedStats from "../../components/animated";
import TeamComponents from "../../components/team";
import IshtirockComponents from "../../components/ishtirok-etish";
import PistonCompiler from "../../components/compiler";
// import SlayderKomponenti from "../../components/swipper";

function Home() {
  return (
    <div className="sm:w-[1640px] sm:mx-auto w-100%">
      {/* <SlayderKomponenti /> */}
      <SwiperComponent />
      <SertificateComponents />
      <KirishComponents />
      <KursToifalariComponents />
      <PremiumEducation />  
      <AnimatedStats />
      <TeamComponents />
      <IshtirockComponents />
    </div>
  );
}

export default Home;
