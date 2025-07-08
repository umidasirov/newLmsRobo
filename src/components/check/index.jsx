import { useEffect } from "react";
import { useAxios } from "../../hooks";

function Check() {
  const axios = useAxios();

  useEffect(() => {
    axios({
      url: "/api/purchased-courses/",
      method: "GET",
    })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return <div className=" shadow-2xl shadow-yellow-400">Check</div>;
}

export default Check;
