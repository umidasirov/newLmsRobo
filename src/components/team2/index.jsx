import { useData } from "../../datacontect";
import { useLocation } from "react-router-dom";

export default function Team2() {
  const { teacherData } = useData();
  const location = useLocation();
  const { name } = location?.state || {};

  // Himoya: teacherData arraymi yo‘qmi?
  const isArray = Array.isArray(teacherData);
  const profile = isArray ? teacherData.find((item) => item?.slug === name) : null;

  const url = "https://api.myrobo.uz";

  // Agar profile topilmasa
  if (!profile) {
    return (
      <div className="w-[90%] m-auto p-10 text-center text-red-500">
        <h2 className="text-2xl font-semibold">Profil topilmadi</h2>
        <p>Iltimos, qayta urinib ko‘ring yoki mentor ro‘yxatidan tanlang.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] m-auto p-6 bg-white rounded-lg shadow-md mt-[60px] shadow-blue-100">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={`${url}/${profile?.img}`}
            alt={profile.name}
            className="w-32 h-32 object-cover rounded-lg shadow-sm mb-4"
          />
          <h2 className="text-xl font-bold">{profile.username}</h2>
          <p className="text-gray-600 mt-1">{profile.direction}</p>
        </div>

        <div className="flex-1 mt-4 md:mt-0">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Mentor haqida</h3>
            <p className="text-gray-600">{profile.about}</p>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Yo'nalish</h3>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm border border-gray-300 rounded-full">
                  {profile?.direction}
                </span>
              </div>
            </div>

            <div className="border-t border-b py-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Yillik tajribasi</span>
                <span>{profile.experience} yil</span>
              </div>
            </div>

            <div className="border-b py-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ish joyi</span>
                <span className="text-blue-600">{profile.work_place}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
