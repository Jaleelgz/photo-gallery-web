import React, { memo } from "react";
import Button from "@mui/material/Button";
import { Box, CardMedia, Typography } from "@mui/material";
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
import { Images } from "../../constants/images/images";

const SignupPage = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

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

  const signUpWithGoogle = async () => {
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

      localStorage.setItem("firebase_result", JSON.stringify(result));

      navigate("register", {
        state: {
          user: {
            accessToken: result?.user?.accessToken,
            name: result?.user?.displayName,
            email: result?.user?.email,
            phone: result?.user?.phoneNumber ? result?.user?.phoneNumber : "",
            image: result?.user?.photoURL ? result?.user?.photoURL : undefined,
          },
        },
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
        <Box sx={{ display: { md: "block", xs: "none" } }} className="bg">
          <Box className="welcomeContainer">
            <Box className="welcomeInnerContainer">
              <Typography className="welcomeTxt">
                Welcome to Photo Gallery
              </Typography>
            </Box>
            <Typography className="subTxt">Sign up with Google</Typography>
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
              Sign up
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
                onClick={signUpWithGoogle}
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
                href="/login"
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
                  Already have an account ?{" "}
                </Typography>
                <Typography
                  style={{
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#703EF0",
                  }}
                >
                  Sign in
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </SigninNSignupContainer>
    </>
  );
};

export default memo(SignupPage);
