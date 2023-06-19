import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import React from "react";
import { StyledLoader } from "./StyledLoader";

const Loader = ({ loadingText }) => {
  return (
    <StyledLoader>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1001,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Paper
            sx={{
              p: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={30} />
          </Paper>
          <Typography className="loading" sx={{ color: "#fff" }}>
            {loadingText && loadingText?.trim() !== ""
              ? loadingText
              : "Loading"}
          </Typography>
        </Box>
      </Box>
    </StyledLoader>
  );
};

export default Loader;
