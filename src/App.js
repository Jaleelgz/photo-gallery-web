import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme";
import Toast from "./common/Toast/Toast";
import { Outlet, Route, Routes } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute/PrivateRoute";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import {
  getUser,
  setUserToLocalStorage,
  signOutUser,
} from "./utils/authServices";
import { setUser } from "./store/slices/UserSlice";
import moment from "moment";
import { auth } from "./utils/firebaseConfig";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddNewImage from "./pages/AddNewImage/AddNewImage";

const App = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast.value);
  const actualUser = useSelector((state) => state.user.value);

  const refreshToken = () => {
    const user = getUser();

    if (user && user.userToken) {
      auth.currentUser
        ?.getIdToken(true)
        .then(function (idToken) {
          if (idToken) {
            dispatch(setUser({ ...actualUser, userToken: idToken }));
            setUserToLocalStorage({ ...user, userToken: idToken });
          }
        })
        .catch(function (error) {
          console.log("token refresh error", error);
        });
    }
  };

  const checkTokenValidity = () => {
    const user = getUser();

    if (user && user?.userToken) {
      try {
        var decoded = jwt_decode(user?.userToken);

        if (
          moment(decoded.exp * 1000)
            .subtract(5, "minutes")
            .valueOf() <= moment().valueOf()
        ) {
          signOutUser();
        } else {
          dispatch(setUser(user));
        }
      } catch (error) {
        console.log("Token validateError", error);
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (actualUser) {
  //       refreshToken();
  //     }
  //   }, 3000000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [actualUser]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {toast.visibility && <Toast />}

        <Routes>
          <Route exact path="/login" element={<LoginPage />} />

          <Route exact path="/signup" element={<Outlet />}>
            <Route exact index element={<SignupPage />} />
            <Route exact path="register" element={<RegisterPage />} />
          </Route>

          <Route exact path="/" element={<PrivateRoute />}>
            <Route
              exact
              index
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              exact
              path="add"
              element={
                <Layout>
                  <AddNewImage />
                </Layout>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
