import { useEffect, useState } from "react";
import { useAxios } from "../../hooks";

function KursToifalariComponents() {
  const axios = useAxios();

  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      url: "/api/categories/",
      method: "GET",
    })
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="bg-[#f1f2f7] py-[40px] mt-[60px] bgnone">
      <div className="w-[90%] m-auto">
        <div className="flex flex-col items-center gap-[20px] bgBlock max-[768px]:shadow-md max-[768px]:shadow-blue-300">
          <h3 className="text-[17px] text-gray-500">
            BULARDAN HAR QANDAY TANLANG
          </h3>
          <h2 className="text-[28px] font-bold">
            Kurslar <span className="text-blue-600">Toifalari</span>
          </h2>
          <div className="flex items-center gap-5 flex-wrap max-[440px]:grid max-[440px]:grid-cols-2 max-[440px]:gap-3 max-[440px]:w-full">
            {data?.map((value) => (
              <div
                key={value?.id}
                className="w-fit p-3 bg-[#fff] text-[17px] text-[#333] rounded-md shadow-md shadow-blue-300 
                max-[440px]:w-full max-[440px]:text-center"
              >
                <h4>{value?.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KursToifalariComponents;
