import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = ({ children, ...rest }) => {
  //   let navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    console.log(user);
  }, [user]);
  console.log(user);
  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Navigate to='/register' />
  );
};
