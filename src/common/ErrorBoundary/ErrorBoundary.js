import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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
              Oops, there is an error!
            </Typography>

            <Button
              onClick={() => window.location.reload()}
              sx={{ mt: "15px" }}
              variant="contained"
              color="primary"
            >
              Try again
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
