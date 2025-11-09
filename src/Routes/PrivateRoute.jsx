import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import Loader from "../Components/Loader";
import { AuthContext } from "../AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader/>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/authentication/login"></Navigate>;

};

export default PrivateRoute;