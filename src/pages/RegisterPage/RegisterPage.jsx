import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SigninNSignupContainer from "../../components/SigninNSignUpContainer/SigninNSignupContainer";
import Loader from "../../common/Loader/Loader";
import {
  Box,
  Button,
  CardMedia,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Images } from "../../constants/images/images";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Login } from "@mui/icons-material";
import { postData } from "../../utils/restUtils";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/ToastSlice";
import { ToastModes } from "../../enum/ToastModes";
import { setUser } from "../../store/slices/UserSlice";
import { setUserToLocalStorage } from "../../utils/authServices";
import { colors } from "../../constants/colors/colors";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = location.state ? location.state : {};
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    name: user?.name ? user.name : "",
    phone: "",
    email: user?.email,
    address: "",
  });

  const register = async () => {
    setError("");
    setLoading(true);
    const registerRes = await postData(
      "user/sign_up",
      { ...profile, phone: `+91${profile.phone}` },
      user.accessToken
    );

    if (!registerRes || registerRes?.status || registerRes?.statusCode) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: registerRes?.message
            ? registerRes?.message
            : "Failed to register.Try again!",
        })
      );
      setError(
        registerRes?.message
          ? registerRes?.message
          : "Failed to register.Try again!"
      );
      setLoading(false);
      return;
    }

    dispatch(setUser(registerRes));
    setUserToLocalStorage(registerRes);
    dispatch(
      showToast({ mode: ToastModes.success, text: "Successfully registered" })
    );
    setLoading(false);
    navigate("/");
  };

  return (
    <React.Fragment>
      {!user ? (
        <Navigate
          to={{
            pathname: "/signup",
            state: { from: location },
          }}
          replace
        />
      ) : (
        <SigninNSignupContainer>
          {loading && <Loader />}

          <Box sx={{ display: { md: "block", xs: "none" } }} className="bg">
            <Box className="welcomeContainer">
              <Box className="welcomeInnerContainer">
                <Typography className="welcomeTxt">
                  Welcome to Photo Gallery
                </Typography>
              </Box>
              <Typography className="subTxt">Register your account</Typography>
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
                Register
              </Typography>

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
                <TextField
                  sx={{
                    borderRadius: "10px",
                  }}
                  fullWidth
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  label="Name"
                  placeholder="Enter your name"
                />

                <TextField
                  sx={{
                    borderRadius: "10px",
                  }}
                  fullWidth
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  InputProps={{ readOnly: true }}
                  label="Email"
                  placeholder="Enter your name"
                />

                <TextField
                  sx={{
                    borderRadius: "10px",
                  }}
                  fullWidth
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                  placeholder="Enter your phone"
                />

                <TextField
                  sx={{
                    borderRadius: "10px",
                  }}
                  fullWidth
                  label="Address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  multiline
                  minRows={4}
                  placeholder="Enter your Address"
                />

                <Button
                  onClick={register}
                  variant="contained"
                  size="large"
                  startIcon={<Login size={25} />}
                  disabled={Object.keys(profile).some(
                    (key) =>
                      profile[key]?.trim() === "" ||
                      (key === "phone" && profile[key]?.trim().length !== 10)
                  )}
                  sx={{
                    borderRadius: "10px",
                    width: "100%",
                    maxWidth: 500,
                    height: "55px",
                  }}
                >
                  Register
                </Button>
                {error && error?.trim() !== "" ? (
                  <Typography sx={{ color: colors.RED, fontSize: "12px" }}>
                    {error}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </Box>
        </SigninNSignupContainer>
      )}
    </React.Fragment>
  );
};

export default RegisterPage;
