import React from "react";
import Header from "./Header/Header";
import { Box } from "@mui/material";
import Footer from "./Footer/Footer";
import { globalStyles } from "../utils/globalStyles";

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          ...globalStyles.maxWidthContainer,
          minHeight: "calc(100vh - 70px)",
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
