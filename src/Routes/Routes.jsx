import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Pages/Home"
import Register from "../Pages/Register";
import LogIn from "../Pages/LogIn";
import ForgetPass from "../Pages/ForgetPass";
import Challenges from "../Pages/Challenges";
import MyActivities from "../Pages/MyActivities"
import ChallengeDetails from "../Pages/ChallengeDetails";
import PrivateRoute from "./PrivateRoute";
import Loader from "../Components/Loader";
import Error from "../Pages/Error";
import AddChallenge from "../Pages/AddChallenge";

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
        element:<PrivateRoute><MyActivities/></PrivateRoute>
      },
      {
        path: 'challenge-details/:id',
        loader: ({params}) => fetch(`https://tera-connect-server.vercel.app/challenges/${params.id}`),
        element: <PrivateRoute><ChallengeDetails/></PrivateRoute>,
        hydrateFallbackElement:<Loader></Loader>
      },
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
      },
      {
        path:'challenges/add',
        element:<PrivateRoute><AddChallenge/></PrivateRoute>
      },
      {
        path:'*',
        Component:Error
      }
    ]
  },
  
      
        
    

]);
