import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../constants/colors/colors";
import { globalStyles } from "../../utils/globalStyles";
import { getFontSize } from "../../utils/responsiveFontSize";
import { AccountCircle, Home, Image, Login, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../utils/authServices";
import { clearUser } from "../../store/slices/UserSlice";
import { showToast } from "../../store/slices/ToastSlice";
import { ToastModes } from "../../enum/ToastModes";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((state) => state.user.value);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    signOutUser();
    dispatch(clearUser());
    handleCloseUserMenu();
    dispatch(showToast({ mode: ToastModes.success, text: "Sign out!" }));
  };

  return (
    <Box sx={{ backgroundColor: colors.PRIMARY }}>
      <Box sx={globalStyles.maxWidthContainer}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image sx={{ fontSize: getFontSize(40), color: "#fff" }} />
            <Typography
              sx={{
                fontSize: getFontSize(40),
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Photo Gallery
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {!user.userId ? (
              <Button
                onClick={() => navigate("/login")}
                startIcon={<Login />}
                variant="outlined"
                sx={{
                  whiteSpace: "nowrap",
                  flexWrap: "nowrap",
                  minWidth: "100px",
                }}
              >
                Sign in
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <Tooltip title={"Home"}>
                  <IconButton onClick={() => navigate("/")}>
                    <Home color="#fff" sx={{ color: "#fff" }} fontSize="20px" />
                  </IconButton>
                </Tooltip>

                <Tooltip title={user.name}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <AccountCircle
                      sx={{ color: "#fff" }}
                      color="#fff"
                      fontSize="20px"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>

          <Menu
            sx={{ mt: "45px", width: "200px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem sx={{ width: "200px" }} onClick={onLogout}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Logout />
                <Typography sx={{ flexGrow: 1 }} textAlign="center">
                  Logout
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
