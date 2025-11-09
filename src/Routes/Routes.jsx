import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Navbar from "../Components/Navbar";
import Home from "../Pages/Home"
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register";
import LogIn from "../Pages/LogIn";
import ForgetPass from "../Pages/ForgetPass";
import Challenges from "../Pages/Challenges";
import MyActivities from "../Pages/MyActivities"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Navbar
      },
      {
        path:'/home',
        Component:Home
      },
      {
        path:"/challenges",
        Component:Challenges
      },
      {
        path:"/my-activities",
        Component:MyActivities
      }
    ]
  },
  {
    path: "/authentication",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register
      },
      {
        path: "login",
        Component: LogIn
      },
      {
        path: "forget-pass",
        Component: ForgetPass
      }
    ]
  }
]);
