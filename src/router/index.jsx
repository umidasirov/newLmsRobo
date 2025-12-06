import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Kurslar from "../pages/kurslar";
import Blog from "../pages/blog";
import Layout from "../components/layout";
import BlogDetail from "../pages/BlogDetail";
import CourseDetail from "../pages/CourseDetail";
import LoginPage from "../pages/login";
import FrontendProfile from "../pages/frontend";
import Team from "../pages/team";
import Check from "../pages/check";
import Profilim from "../pages/profilim";
import MeningKurslarim from "../pages/my-courses";
import Sertificatlarim from "../pages/sertificatlarim";
import NotFound from "../components/not-found";
import PistonCompiler from "../components/compiler";
import RegistrationForm from "../pages/registration";

const root = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "kurslar",
        element: <Kurslar />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:slug",
        element: <BlogDetail />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "kurslar/:id",
        element: <CourseDetail />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "frontend",
        element: <FrontendProfile />,
      },
      {
        path: "check",
        element: <Check />,
      },
      {
        path: "profilim",
        element: <Profilim />,
      },
      {
        path: "my-courses",
        element: <MeningKurslarim />,
      },
      {
        path: "sertificatlarim",
        element: <Sertificatlarim />,
      },
      {
        path:"compilyator",
        element:<PistonCompiler/>
      },
      {
        path:"/registration",
        element:<RegistrationForm/>
      }
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default root;
