import { Add } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../constants/colors/colors";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography sx={{ fontWeight: "600" }}>Home</Typography>
      <Tooltip title="Add new Image">
        <IconButton
          sx={{
            backgroundColor: colors.PRIMARY,
            position: "absolute",
            bottom: 100,
            right: 50,
            "&:hover": {
              backgroundColor: colors.RED,
            },
          }}
          onClick={() => navigate("/add")}
        >
          <Add sx={{ color: "#fff" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default HomePage;
