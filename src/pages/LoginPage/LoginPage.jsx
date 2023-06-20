import React, { memo, useState } from "react";
import Button from "@mui/material/Button";
import { Box, CardMedia, Typography } from "@mui/material";
import { postData } from "../../utils/restUtils";
import { setUserToLocalStorage, signOutUser } from "../../utils/authServices";
import SigninNSignupContainer from "../../components/SigninNSignUpContainer/SigninNSignupContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/ToastSlice";
import { ToastModes } from "../../enum/ToastModes";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FcGoogle } from "react-icons/fc";
import { RecaptchaVerifier, signInWithPopup } from "firebase/auth";
import { globalStyles } from "../../utils/globalStyles";
import { auth, googleProvider } from "../../utils/firebaseConfig";
import { useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import { Images } from "../../constants/images/images";

const LoginPage = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const signIn = async ({ accessToken, uid }) => {
    setLoading(true);
    const signInRes = await postData("user/sign_in", undefined, accessToken);

    if (!signInRes) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: "Failed to sign in.Try again!",
        })
      );
      signOutUser();
      setLoading(false);
      return;
    }

    if (signInRes.status) {
      dispatch(showToast({ mode: ToastModes.error, text: signInRes.message }));
      setError({
        isError: true,
        message: signInRes.message
          ? signInRes.message
          : "Failed to login.Try again!",
      });
      signOutUser();
      setLoading(false);
      return;
    }

    setUserToLocalStorage(signInRes);
    setError("");

    setLoading(false);
    window?.history?.replaceState(null, null, "/");
    window?.location?.reload();
  };

  useEffect(() => {
    generateRecaptcha();
  }, []);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptachContainer",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      if (!result || !result.user) {
        dispatch(
          showToast({
            mode: ToastModes.error,
            text: "Request failed.Try again!",
          })
        );
        return;
      }

      localStorage.setItem(
        "firebase_result",
        JSON.stringify({
          accessToken: result.user?.accessToken,
          uid: result.user?.uid,
        })
      );

      signIn({
        accessToken: result.user?.accessToken,
        uid: result.user?.uid,
      });
    } catch (error) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: error.code
            ? error.code?.replace("auth/", "")?.replace(/-/g, " ")
            : "Failed to Login.Try again!",
        })
      );
    }
  };

  return (
    <>
      <SigninNSignupContainer>
        {loading && <Loader />}

        <Box sx={{ display: { md: "block", xs: "none" } }} className="bg">
          <Box className="welcomeContainer">
            <Box className="welcomeInnerContainer">
              <Typography className="welcomeTxt">
                Welcome to Photo Gallery
              </Typography>
            </Box>
            <Typography className="subTxt">Sign in with Google</Typography>
          </Box>
        </Box>
        <Box className={width < 900 ? "right rightbg" : "right"}>
          <Box className="innerContainer">
            <Typography
              sx={{
                fontWeight: "900",
                fontSize: 30,
              }}
            >
              Sign in
            </Typography>

            <div id="recaptachContainer" />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                gap: "17px",
                width: "100%",
                mt: "30px",
              }}
            >
              <Button
                onClick={signInWithGoogle}
                variant="outlined"
                size="large"
                startIcon={<FcGoogle size={25} />}
                className={width < 900 ? "btn btnBorder" : "btn"}
                sx={{
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: 500,
                  height: "55px",
                }}
              >
                Continue with Google
              </Button>

              <Button
                href="/signup"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  textTransform: "none",
                  padding: 0,
                  gap: "5px",
                }}
              >
                <Typography
                  style={{
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: 15,
                    letterSpacing: -0.408,
                    color: "#455154",
                    ...globalStyles.textCenter,
                  }}
                >
                  Don't have an account ?{" "}
                </Typography>
                <Typography
                  style={{
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#703EF0",
                  }}
                >
                  Sign up
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </SigninNSignupContainer>
    </>
  );
};

export default memo(LoginPage);
