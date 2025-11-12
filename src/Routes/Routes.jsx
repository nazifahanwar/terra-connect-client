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
import ChallengeDetails from "../Pages/ChallengeDetails";
import PrivateRoute from "./PrivateRoute";
import Loader from "../Components/Loader";
import Error from "../Pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path:"/challenges",
        Component:Challenges
      },
      {
        path:"/my-activities",
        Component:MyActivities
      },
      {
        path: 'challenge-details/:id',
        loader: ({params}) => fetch(`http://localhost:5000/challenges/${params.id}`),
        element: <PrivateRoute><ChallengeDetails/></PrivateRoute>,
        hydrateFallbackElement:<Loader></Loader>
      },
      {
        path:'*',
        Component:Error
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
        path: "forget-password",
        Component: ForgetPass
      }
        
    ]
  }
]);
