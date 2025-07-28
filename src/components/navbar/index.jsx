// import { Button, Drawer } from "antd";
// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo3.png";
// import { MenuOutlined, UserOutlined } from "@ant-design/icons";

// function Navbar() {
//   const [visible, setVisible] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const showDrawer = () => {
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   // get tooken

//   const token = localStorage.getItem("token");
//   const balance = localStorage.getItem("balance");
//   const number = localStorage.getItem("phone");

//   return (
//     <>
//       <section className="bg-[#FFF] border-b-[1px] border-[#eaeaea] top-0 z-[999] sticky">
//         <div className="w-[90%] h-[70px] m-auto flex items-center justify-between py-[45px]">
//           <div>
//             <Link to={"/"}>
//               <img
//                 className="w-[250px] md:w-[200px] sm:w-[180px] hover:opacity-90 transition-opacity"
//                 src={logo}
//                 alt=""
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden sm:flex items-center gap-[40px] text-[17px] font-medium text-[#616161]">
//             <Link
//               to={"/"}
//               className={`relative group ${
//                 isActive("/") ? "text-[#1890ff]" : ""
//               }`}
//             >
//               Bosh sahifa
//               <span
//                 className={`absolute left-0 -bottom-1 h-0.5 bg-[#1890ff] transition-all duration-300 ${
//                   isActive("/") ? "w-full" : "w-0 group-hover:w-full"
//                 }`}
//               ></span>
//             </Link>

//             <Link
//               to={"/kurslar"}
//               className={`relative group ${
//                 isActive("/kurslar") ? "text-[#1890ff]" : ""
//               }`}
//             >
//               Kurslar
//               <span
//                 className={`absolute left-0 -bottom-1 h-0.5 bg-[#1890ff] transition-all duration-300 ${
//                   isActive("/kurslar") ? "w-full" : "w-0 group-hover:w-full"
//                 }`}
//               ></span>
//             </Link>

//             <Link
//               to={"/blog"}
//               className={`relative group ${
//                 isActive("/blog") ? "text-[#1890ff]" : ""
//               }`}
//             >
//               Blog
//               <span
//                 className={`absolute left-0 -bottom-1 h-0.5 bg-[#1890ff] transition-all duration-300 ${
//                   isActive("/blog") ? "w-full" : "w-0 group-hover:w-full"
//                 }`}
//               ></span>
//             </Link>
//           </div>

//           <div className="flex items-center gap-4">
//             {token ? (
//               <Button
//                 className="hidden sm:block w-[50px] h-[35px] hover:bg-[#40a9ff] hover:border-[#40a9ff] transition-colors text-[17px]"
//                 type="primary"
//               >
//                 <UserOutlined />
//               </Button>
//             ) : (
//               <Button
//                 onClick={() => navigate("/login")}
//                 className="hidden sm:block w-[120px] h-[35px] hover:bg-[#40a9ff] hover:border-[#40a9ff] transition-colors"
//                 type="primary"
//               >
//                 Kirish
//               </Button>
//             )}

//             <button
//               className="sm:hidden text-2xl text-[#616161] hover:text-[#1890ff] transition-colors"
//               onClick={showDrawer}
//             >
//               <MenuOutlined />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Mobile Sidebar Drawer */}
//       <Drawer
//         title={
//           <Link to={"/"} onClick={onClose}>
//             <img
//               className="w-[180px] hover:opacity-90 transition-opacity"
//               src={logo}
//               alt=""
//             />
//           </Link>
//         }
//         placement="left"
//         closable={true}
//         onClose={onClose}
//         visible={visible}
//         width="70%"
//         bodyStyle={{ padding: 0 }}
//         headerStyle={{ padding: "16px 20px" }}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex flex-col gap-1 p-2">
//             <Link
//               to={"/"}
//               onClick={onClose}
//               className={`p-3 text-[15px] font-medium ${
//                 isActive("/") ? "text-[#1890ff] bg-blue-50" : "text-[#616161]"
//               } hover:text-[#1890ff] hover:bg-blue-50 transition-colors rounded`}
//             >
//               Bosh sahifa
//             </Link>

//             <Link
//               to={"/kurslar"}
//               onClick={onClose}
//               className={`p-3 text-[15px] font-medium ${
//                 isActive("/kurslar")
//                   ? "text-[#1890ff] bg-blue-50"
//                   : "text-[#616161]"
//               } hover:text-[#1890ff] hover:bg-blue-50 transition-colors rounded`}
//             >
//               Kurslar
//             </Link>

//             <Link
//               to={"/blog"}
//               onClick={onClose}
//               className={`p-3 text-[15px] font-medium ${
//                 isActive("/blog")
//                   ? "text-[#1890ff] bg-blue-50"
//                   : "text-[#616161]"
//               } hover:text-[#1890ff] hover:bg-blue-50 transition-colors rounded`}
//             >
//               Blog
//             </Link>
//           </div>

//           <div className="mt-auto p-4">
//             <Button
//               className="w-full h-[38px] hover:bg-[#40a9ff] hover:border-[#40a9ff] transition-colors"
//               type="primary"
//               onClick={() => {
//                 onClose();
//                 navigate("/login");
//               }}
//             >
//               Kirish
//             </Button>
//           </div>
//         </div>
//       </Drawer>
//     </>
//   );
// }

// export default Navbar;

import { Button, Drawer, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo3.png";
import {
  MenuOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  StarOutlined,
  DollarCircleOutlined,
  EditOutlined
} from "@ant-design/icons"
const balans = localStorage.getItem("balance");
function Navbar() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const isActive = (path) => location.pathname === path;

  const token = localStorage.getItem("token");
  const balance = localStorage.getItem("balance") || "0";
  const phone = localStorage.getItem("phone") || "+998";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    localStorage.removeItem("phone");
    navigate("/");
  };

  const userMenu = (
    <Menu style={{width:'200px'}}>
      <Menu.Item
        key="1"
        icon={<BookOutlined />}
        onClick={() => navigate("/my-courses")}
      >
        Kurslarim
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<UserOutlined />}
        onClick={() => navigate("/profilim")}
      >
        Profilim
      </Menu.Item>

      <Menu.Item
        key="3"
        icon={<EditOutlined />}
        onClick={() => navigate("/registrate")}
      >
        Profilni sozlash
      </Menu.Item>

      <Menu.Divider />

      {/* Daraja va balans bir qatorda */}
      <Menu.Item key="info" disabled style={{ cursor: "default", padding: "8px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <StarOutlined />
            <span>5</span>
          </div>
          <div style={{ height: "20px", width: "1px", backgroundColor: "#ccc" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <DollarCircleOutlined />
            <span>{balans}</span>
          </div>
        </div>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Chiqish
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-[999]">
        <div className="  w-[90%] m-auto h-[80px] flex items-center justify-between">
          <Link to="/">
            <img
              className="w-[200px] hover:opacity-90 transition-opacity"
              src={logo}
              alt="Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-[60px] text-[17px] font-medium text-gray-600">
            <Link
              to="/"
              className={`relative group ${isActive("/") ? "text-blue-500" : ""
                }`}
            >
              Bosh sahifa
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-blue-500 transition-all duration-300 ${isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>

            <Link
              to="/kurslar"
              className={`relative group ${isActive("/kurslar") ? "text-blue-500" : ""
                }`}
            >
              Kurslar
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-blue-500 transition-all duration-300 ${isActive("/kurslar") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>

            <Link
              to="/blog"
              className={`relative group ${isActive("/blog") ? "text-blue-500" : ""
                }`}
            >
              Blog
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-blue-500 transition-all duration-300 ${isActive("/blog") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {token ? (
              <>
                {/* Desktop - Dropdown */}
                <Dropdown
                  overlay={userMenu}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button
                    className="hidden sm:block w-[60px] h-9 hover:bg-blue-400 hover:border-blue-400 transition-colors"
                    type="primary"
                  >
                    <UserOutlined />
                  </Button>
                </Dropdown>

                {/* Mobile - Only show menu button */}
                <button
                  className="sm:hidden text-2xl text-gray-600 hover:text-blue-500 transition-colors"
                  onClick={showDrawer}
                  aria-label="Menu"
                >
                  <MenuOutlined />
                </button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="hidden sm:block h-9 hover:bg-blue-400 hover:border-blue-400 transition-colors"
                type="primary"
              >
                Kirish
              </Button>
            )}

            {!token && (
              <button
                className="sm:hidden text-2xl  text-gray-600 hover:text-blue-500 transition-colors"
                onClick={showDrawer}
                aria-label="Menu"
              >
                <MenuOutlined />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        title={
          <Link to="/" onClick={onClose}>
            <img
              className="w-[180px] hover:opacity-90 transition-opacity"
              src={logo}
              alt="Logo"
            />
          </Link>
        }
        placement="left"
        closable={true}
        onClose={onClose}
        open={visible}
        width="70%"
        bodyStyle={{ padding: 0 }}
        headerStyle={{ padding: "16px 20px" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-1 p-2">
            <Link
              to="/"
              onClick={onClose}
              className={`p-3 text-[15px] font-medium ${isActive("/") ? "text-blue-500 bg-blue-50" : "text-gray-600"
                } hover:text-blue-500 hover:bg-blue-50 transition-colors rounded`}
            >
              Bosh sahifa
            </Link>
            <Link
              to="/kurslar"
              onClick={onClose}
              className={`p-3 text-[15px] font-medium ${isActive("/kurslar")
                ? "text-blue-500 bg-blue-50"
                : "text-gray-600"
                } hover:text-blue-500 hover:bg-blue-50 transition-colors rounded`}
            >
              Kurslar
            </Link>

            <Link
              to="/blog"
              onClick={onClose}
              className={`p-3 text-[15px] font-medium ${isActive("/blog") ? "text-blue-500 bg-blue-50" : "text-gray-600"
                } hover:text-blue-500 hover:bg-blue-50 transition-colors rounded`}
            >
              Blog
            </Link>

            {/* Profile bar */}

            {token && (
              <>
                <div className="p-4 border-t border-b border-gray-200 my-2">
                  <div className="text-sm font-medium text-gray-500">
                    Balans:
                  </div>
                  <div className="text-lg font-bold">{balance} so'm</div>

                  <div className="mt-2 text-sm font-medium text-gray-500">
                    Telefon:
                  </div>
                  <div className="text-lg">{phone}</div>
                </div>


                <Link
                  to="/profilim"
                  onClick={onClose}
                  className={`flex items-center p-3 text-[15px] font-medium ${isActive("/profilim")
                    ? "text-blue-500 bg-blue-50"
                    : "text-gray-600"
                    } hover:text-blue-500 hover:bg-blue-50 transition-colors rounded`}
                >
                  <UserOutlined className="mr-2" />
                  Profilim
                </Link>

                <Link
                  to="/my-courses"
                  onClick={onClose}
                  className={`flex items-center p-3 text-[15px] font-medium ${isActive("/my-courses")
                    ? "text-blue-500 bg-blue-50"
                    : "text-gray-600"
                    } hover:text-blue-500 hover:bg-blue-50 transition-colors rounded`}
                >
                  <BookOutlined className="mr-2" />
                  Kurslarim
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    onClose();
                  }}
                  className="flex items-center p-3 text-[15px] font-medium text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-colors rounded w-full text-left"
                >
                  <LogoutOutlined className="mr-2" />
                  Chiqish
                </button>
              </>
            )}
          </div>

          {!token && (
            <div className="mt-auto p-4">
              <Button
                block
                type="primary"
                onClick={() => {
                  onClose();
                  navigate("/login");
                }}
                className="h-9 hover:bg-blue-400 hover:border-blue-400"
              >
                Kirishsda
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
