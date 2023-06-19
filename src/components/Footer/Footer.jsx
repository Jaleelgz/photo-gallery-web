import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../constants/colors/colors";
import { globalStyles } from "../../utils/globalStyles";
import { Copyright } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: colors.DISABLED_TXT }}>
      <Box
        sx={{
          ...globalStyles.maxWidthContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Typography sx={{ fontSize: "15px", color: "#fff" }}>
          All rights reserved
        </Typography>
        <Copyright sx={{ color: "#fff" }} />
        <Typography sx={{ fontSize: "15px", color: "#fff" }}>
          {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
