import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
        <ErrorOutlineIcon
          sx={{ height: "50px", width: "50px", color: "red" }}
        />
        <Typography
          sx={{
            fontSize: 21,
          }}
        >
          404 - Page Not Found
        </Typography>

        <Button
          onClick={() => {
            navigate("/");
          }}
          sx={{
            mt: "15px",
          }}
          variant="contained"
          color="secondary"
        >
          Back to home
        </Button>
      </Box>
    </Box>
  );
};
export default NotFoundPage;
