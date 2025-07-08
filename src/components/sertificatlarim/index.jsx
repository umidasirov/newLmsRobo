import { Button } from "antd";
import img from "../../assets/404not_found.png";
import { useNavigate } from "react-router-dom";

function Sertificatlarim() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="w-[90%] m-auto">
        <div className="flex items-center justify-center h-[79vh] flex-col ">
          <img className="w-[30%] max-[768px]:w-[50%]" src={img} alt="" />
          <div className="flex items-center justify-center flex-col gap-[20px]">
            <h1 className="font-bold text-[24px] ">
              Sertificatingiz mavjud emas !
            </h1>
            <p className="text-[17px] text-center">
              Bu yer hozircha bo‘sh – Ammo tez orada sizning yutuqlaringiz bilan
              to‘ladi! 🏆
            </p>
            <Button onClick={() => navigate("/")} type="primary">
              Bosh sahifa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sertificatlarim;
