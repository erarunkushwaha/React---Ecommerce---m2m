// import { useSelector } from "react-redux";
// import { Route, useNavigate } from "react-router-dom";

// export const PrivateUserRoute = ({ children, ...rest }) => {
//   const { user } = useSelector((state) => ({ ...state }));
//   return (
//     <Route
//       {...rest}
//       render={() => (user && user.token ? children : navigate("/register"))}
//     />
//   );
// };

import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateUserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const check = async () => {};
    check();
  }, [user]);

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Navigate to='/test' />
  );
};
