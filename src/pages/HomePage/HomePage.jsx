import { Add } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors/colors";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader/Loader";
import { getData } from "../../utils/restUtils";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/ToastSlice";
import { ToastModes } from "../../enum/ToastModes";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({ visibility: false, text: "" });
  const [data, setData] = useState([]);

  const getGallery = async () => {
    setLoading({ visibility: true, text: "Fetching gallery" });

    const galleryRes = await getData("gallery/all");

    if (!galleryRes || galleryRes?.statusCode || galleryRes?.status) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: galleryRes?.message
            ? galleryRes?.message
            : "Request failed.Try again!",
        })
      );
      setLoading({ visibility: false, text: "" });
      return;
    }

    setData(galleryRes);
    setLoading({ visibility: false, text: "" });
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <Box>
      {loading.visibility && <Loader loadingText={loading.text} />}
      <Typography sx={{ fontWeight: "600" }}>Home</Typography>

      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          gap: "20px",
          columnGap: "20px",
          rowGap: "20px",
          flexWrap: "wrap",
        }}
      >
        {data.map((galleryItem) => (
          <Box
            sx={{
              borderRadius: "5px",
              border: "2px solid #f2f2f2",
              padding: "5px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            key={galleryItem.id}
          >
            <img
              src={galleryItem.image}
              alt={galleryItem.title}
              style={{ height: "200px", objectFit: "contain",borderRadius:'5px',maxWidth:'100%' }}
            />
            <Typography
              sx={{ textAlign: "center", my: 0.5, fontWeight: "600" }}
            >
              {galleryItem.title}
            </Typography>
          </Box>
        ))}
      </Box>

      <Tooltip title="Add new Image">
        <IconButton
          sx={{
            backgroundColor: colors.PRIMARY,
            position: "fixed",
            bottom: 30,
            right: 20,
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
