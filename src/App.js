import "./App.css";
import { Routes, Route } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./pages/Header";
import Register from "./pages/auth/Register";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./function/auth";
import { PrivateUserRoute } from "./router/PrivateUserRoute";
import { useSelector } from "react-redux";

import Login from "./pages/auth/Login";
import { AdminRoute } from "./router/AdminRoute";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Category from "./pages/admin/category/Category";
import SubCategory from "./pages/admin/subCategory/SubCategory";
// import SubCategory from "./pages/admin/subCategory/SubCategory";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const { displayName, email, accessToken, uid, photoURL } = user;
        const { accessToken } = user;
        // console.log(displayName, email, accessToken, uid, photoURL);
        currentUser(accessToken)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              playload: {
                displayName: res.user.name,
                email: res.user.email,
                accessToken,
                photoURL: res.user.picture,
                uid: res.user.uid,
                _id: res.user._id,
                role: res.user.role,
              },
            });
          })

          .catch((err) => {
            toast.error("No Permissio to access this route !", {
              position: "top-right",
            });
            // console.log("error is", err);
          });
      }
    });
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path='/register' element={<Register />} />
        {/* <Route exact path='/login' element={<Login />} /> */}
        {user && user.accessToken && (
          <Route exact path='/admin/dashboard' element={<Dashboard />} />
        )}
        {/* {user ? (
          <Route exact path='/ <Route exact path='/register' element={<Register />} />' element={<Login />} />
        ) : (
          navigate("/register")
        )} */}
        <Route exact path='/admin/dashboard/category' element={<Category />} />
        <Route
          exact
          path='/admin/dashboard/SubCategory'
          element={<SubCategory />}
        />
      </Routes>
    </>
  );
}

export default App;
