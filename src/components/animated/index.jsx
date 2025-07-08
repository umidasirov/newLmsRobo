// // components/AnimatedStats.jsx
// import { section } from "framer-motion/client";
// import { useEffect, useRef, useState } from "react";

// const AnimatedStats = () => {
//   const [studentCount, setStudentCount] = useState(0);
//   const [completedClasses, setCompletedClasses] = useState(0);
//   const [satisfactionRate, setSatisfactionRate] = useState(0);
//   const [teacherCount, setTeacherCount] = useState(0);

//   const statsRef = useRef(null);
//   const intervalDuration = 50; // Animation speed (lower is faster)

//   // Target values
//   const targetStudentCount = 58600;
//   const targetCompletedClasses = 38500;
//   const targetSatisfactionRate = 98.9;
//   const targetTeacherCount = 32000;

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             startAnimations();
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (statsRef.current) {
//       observer.observe(statsRef.current);
//     }

//     return () => {
//       if (statsRef.current) {
//         observer.unobserve(statsRef.current);
//       }
//     };
//   }, []);

//   const startAnimations = () => {
//     const studentInterval = setInterval(() => {
//       setStudentCount((prev) => {
//         if (prev < targetStudentCount) {
//           const step = Math.ceil((targetStudentCount - prev) / 10);
//           return prev + (step > 1000 ? 1000 : step);
//         }
//         clearInterval(studentInterval);
//         return targetStudentCount;
//       });
//     }, intervalDuration);

//     const classesInterval = setInterval(() => {
//       setCompletedClasses((prev) => {
//         if (prev < targetCompletedClasses) {
//           const step = Math.ceil((targetCompletedClasses - prev) / 10);
//           return prev + (step > 1000 ? 1000 : step);
//         }
//         clearInterval(classesInterval);
//         return targetCompletedClasses;
//       });
//     }, intervalDuration);

//     const satisfactionInterval = setInterval(() => {
//       setSatisfactionRate((prev) => {
//         if (prev < targetSatisfactionRate) {
//           const step = (targetSatisfactionRate - prev) / 10;
//           return +(prev + (step > 2 ? 2 : step)).toFixed(1);
//         }
//         clearInterval(satisfactionInterval);
//         return targetSatisfactionRate;
//       });
//     }, intervalDuration);

//     const teacherInterval = setInterval(() => {
//       setTeacherCount((prev) => {
//         if (prev < targetTeacherCount) {
//           const step = Math.ceil((targetTeacherCount - prev) / 10);
//           return prev + (step > 1000 ? 1000 : step);
//         }
//         clearInterval(teacherInterval);
//         return targetTeacherCount;
//       });
//     }, intervalDuration);

//     return () => {
//       clearInterval(studentInterval);
//       clearInterval(classesInterval);
//       clearInterval(satisfactionInterval);
//       clearInterval(teacherInterval);
//     };
//   };

//   return (
//     <section className="w-[90%] mx-auto mt-[80px]  max-[768px]:mt-[60px]">
//       <div
//         ref={statsRef}
//         className="flex  items-center justify-between gap-6 max-[768px]:grid max-[768px]:grid-cols-3 max-[768px]:justify-items-center max-[768px]:gap-4"
//       >
//         {/* 1. Talabalar statistikasi */}
//         <div className="bg-white w-full rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 shadow-blue-200  ">
//           <div className="text-4xl font-bold text-blue-600 mb-2 max-[768px]:text-2xl max-[500px]:text-sm">
//             {studentCount.toLocaleString()}
//           </div>
//           <div className="text-gray-600 max-[600px]:text-[12px] max-[500px]:text-[7px]">
//             Talaba ro'yhatdan o'tdi
//           </div>
//           <div className="mt-4 h-2 bg-blue-100 rounded-full max-[500px]:h-1">
//             <div
//               className="h-2 bg-blue-500 rounded-full max-[500px]:h-1"
//               style={{ width: `${(studentCount / targetStudentCount) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* 2. Sinf yo'qlamalari */}
//         <div className="bg-white w-full rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 shadow-blue-200">
//           <div className="text-4xl font-bold text-green-600 mb-2 max-[768px]:text-2xl max-[500px]:text-sm">
//             {completedClasses.toLocaleString()}
//           </div>
//           <div className="text-gray-600 max-[600px]:text-[12px] max-[500px]:text-[7px]">
//             Sinf yo'qlamalari
//           </div>
//           <div className="mt-4 h-2 bg-green-100 rounded-full max-[500px]:h-1">
//             <div
//               className="h-2 bg-green-500 rounded-full max-[500px]:h-1"
//               style={{
//                 width: `${(completedClasses / targetCompletedClasses) * 100}%`,
//               }}
//             ></div>
//           </div>
//         </div>

//         {/* 3. Qoniqish darajasi */}
//         <div className="bg-white w-full rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 shadow-blue-200">
//           <div className="text-4xl font-bold text-purple-600 mb-2 max-[768px]:text-2xl max-[500px]:text-sm">
//             {satisfactionRate.toFixed(1)}%
//           </div>
//           <div className="text-gray-600 max-[600px]:text-[12px] max-[500px]:text-[7px]">
//             Qoniqish darajasi
//           </div>
//           <div className="mt-4 h-2 bg-purple-100 rounded-full max-[500px]:h-1">
//             <div
//               className="h-2 bg-purple-500 rounded-full max-[500px]:h-1"
//               style={{
//                 width: `${(satisfactionRate / targetSatisfactionRate) * 100}%`,
//               }}
//             ></div>
//           </div>
//         </div>

//         {/* 4. Eng yaxshi o'qituvchilar (pastki qatorda markazda) */}
//         <div className="bg-white w-full rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 shadow-blue-200 max-[768px]:col-span-3 max-[768px]:w-[34%] max-[768px]:mx-auto">
//           <div className="text-4xl font-bold text-orange-600 mb-2 max-[768px]:text-2xl max-[500px]:text-sm ">
//             {teacherCount.toLocaleString()}
//           </div>
//           <div className="text-gray-600 max-[600px]:text-[12px] max-[500px]:text-[7px]">
//             Eng yaxshi o'qituvchilar
//           </div>
//           <div className="mt-4 h-2 bg-orange-100 rounded-full max-[500px]:h-1">
//             <div
//               className="h-2 bg-orange-500 rounded-full max-[500px]:h-1"
//               style={{
//                 width: `${(teacherCount / targetTeacherCount) * 100}%`,
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AnimatedStats;

// components/AnimatedStats.jsx
import { section } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";

const AnimatedStats = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [completedClasses, setCompletedClasses] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);

  const statsRef = useRef(null);
  const intervalDuration = 50; // Animation speed (lower is faster)

  // Target values
  const targetStudentCount = 58600;
  const targetCompletedClasses = 38500;
  const targetSatisfactionRate = 98.9;
  const targetTeacherCount = 32000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimations();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const startAnimations = () => {
    const studentInterval = setInterval(() => {
      setStudentCount((prev) => {
        if (prev < targetStudentCount) {
          const step = Math.ceil((targetStudentCount - prev) / 10);
          return prev + (step > 1000 ? 1000 : step);
        }
        clearInterval(studentInterval);
        return targetStudentCount;
      });
    }, intervalDuration);

    const classesInterval = setInterval(() => {
      setCompletedClasses((prev) => {
        if (prev < targetCompletedClasses) {
          const step = Math.ceil((targetCompletedClasses - prev) / 10);
          return prev + (step > 1000 ? 1000 : step);
        }
        clearInterval(classesInterval);
        return targetCompletedClasses;
      });
    }, intervalDuration);

    const satisfactionInterval = setInterval(() => {
      setSatisfactionRate((prev) => {
        if (prev < targetSatisfactionRate) {
          const step = (targetSatisfactionRate - prev) / 10;
          return +(prev + (step > 2 ? 2 : step)).toFixed(1);
        }
        clearInterval(satisfactionInterval);
        return targetSatisfactionRate;
      });
    }, intervalDuration);

    const teacherInterval = setInterval(() => {
      setTeacherCount((prev) => {
        if (prev < targetTeacherCount) {
          const step = Math.ceil((targetTeacherCount - prev) / 10);
          return prev + (step > 1000 ? 1000 : step);
        }
        clearInterval(teacherInterval);
        return targetTeacherCount;
      });
    }, intervalDuration);

    return () => {
      clearInterval(studentInterval);
      clearInterval(classesInterval);
      clearInterval(satisfactionInterval);
      clearInterval(teacherInterval);
    };
  };

  return (
    <section className="w-[90%] mx-auto mt-[80px]  max-[768px]:mt-[30px]">
      <div
        ref={statsRef}
        className="flex  items-center justify-between gap-6 max-[768px]:grid max-[768px]:grid-cols-2"
      >
        {/* 1. Talabalar statistikasi */}
        <div className="bg-white w-full rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 shadow-blue-200  ">
          <div className="text-4xl font-bold text-blue-600 mb-2 max-[768px]:text-2xl max-[500px]:text-sm">
            {studentCount.toLocaleString()}
          </div>
          <div className="text-gray-600 max-[600px]:text-[15px] max-[500px]:text-[10px]">
            Talaba ro'yhatdan o'tdi
          </div>
          <div className="mt-4 h-2 bg-blue-100 rounded-full max-[500px]:h-1">
            <div
              className="h-2 bg-blue-500 rounded-full max-[500px]:h-1"
              style={{ width: `${(studentCount / targetStudentCount) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 2. Sinf yo'qlamalari */}
        <div className="bg-white w-full rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 shadow-blue-200">
          <div className="text-4xl font-bold text-green-600 mb-2 max-[768px]:text-2xl max-[500px]:text-sm">
            {completedClasses.toLocaleString()}
          </div>
          <div className="text-gray-600 max-[600px]:text-[15px] max-[500px]:text-[10px]">
            Sinf yo'qlamalari
          </div>
          <div className="mt-4 h-2 bg-green-100 rounded-full max-[500px]:h-1">
            <div
              className="h-2 bg-green-500 rounded-full max-[500px]:h-1"
              style={{
                width: `${(completedClasses / targetCompletedClasses) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* 3. Qoniqish darajasi */}
        <div className="bg-white w-full rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 shadow-blue-200">
          <div className="text-4xl font-bold text-purple-600 mb-2 max-[768px]:text-2xl max-[500px]:text-sm">
            {satisfactionRate.toFixed(1)}%
          </div>
          <div className="text-gray-600 max-[600px]:text-[15px] max-[500px]:text-[10px]">
            Qoniqish darajasi
          </div>
          <div className="mt-4 h-2 bg-purple-100 rounded-full max-[500px]:h-1">
            <div
              className="h-2 bg-purple-500 rounded-full max-[500px]:h-1"
              style={{
                width: `${(satisfactionRate / targetSatisfactionRate) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* 4. Eng yaxshi o'qituvchilar (pastki qatorda markazda) */}
        <div className="bg-white w-full rounded-lg shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-200 shadow-blue-200">
          <div className="text-4xl font-bold text-orange-600 mb-2 max-[768px]:text-2xl max-[500px]:text-sm ">
            {teacherCount.toLocaleString()}
          </div>
          <div className="text-gray-600 max-[600px]:text-[15px] max-[500px]:text-[10px]">
            Eng yaxshi o'qituvchilar
          </div>
          <div className="mt-4 h-2 bg-orange-100 rounded-full max-[500px]:h-1">
            <div
              className="h-2 bg-orange-500 rounded-full max-[500px]:h-1"
              style={{
                width: `${(teacherCount / targetTeacherCount) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
