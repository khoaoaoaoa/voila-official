import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import NotFound from "../404NotFound/404NotFound";
import SpinnerLoading from "../Components/SpinnerLoading/SpinnerLoading";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) return <NotFound />;

  return children;
};

export default ProtectedRoute;
