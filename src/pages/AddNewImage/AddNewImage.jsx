import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { globalStyles } from "../../utils/globalStyles";
import { AddPhotoAlternate, Upload } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/restUtils";
import { showToast } from "../../store/slices/ToastSlice";
import { ToastModes } from "../../enum/ToastModes";
import { uploadImages } from "../../utils/uploadImg";
import Loader from "../../common/Loader/Loader";

const AddNewImage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState({ visibility: false, text: "" });
  const [uploadData, setUploadData] = useState({ title: "", image: "" });

  const uploadImagesAndCreateRecord = async () => {
    setLoading({ visibility: true, text: "Uploading image" });
    let uploadedImage = [];

    uploadedImage = await uploadImages(uploadData.image);

    if (uploadedImage.length === 0) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: "Failed to upload image.Try again!",
        })
      );
      setLoading({ visibility: false, text: "" });
      return;
    }

    setLoading({ visibility: true, text: "Creating gallery item" });

    const updateRes = await postData(`gallery/create`, {
      ...uploadData,
      image: uploadedImage,
    });

    if (!updateRes || updateRes?.status || updateRes?.statusCode) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: "Failed to create Record.Try again!",
        })
      );
      setLoading({ visibility: false, text: "" });
      navigate(`/`);
      return;
    }

    setLoading({ visibility: false, text: "" });
    dispatch(showToast({ mode: ToastModes.success, text: "Success" }));
    navigate(`/`);
  };

  const handleUploadClick = (event) => {
    const files = event.target.files;

    if (!files || files?.length === 0) {
      return;
    }

    let image = URL.createObjectURL(event.target.files[0]);

    setUploadData({ ...uploadData, image });
  };

  return (
    <Box sx={globalStyles.maxWidthContainer}>
      {loading.visibility && <Loader loadingText={loading.text} />}

      <Box sx={{ my: 2 }}>
        <Typography sx={{ fontWeight: "600" }}>
          {uploadData.id ? "Image" : "Add new image"}
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />

          {uploadData.image?.trim() === "" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                width: "90vw",
                border: "1px solid #383737",
                maxWidth: "300px",
              }}
            >
              <label htmlFor="contained-button-file">
                <Button
                  startIcon={<AddPhotoAlternate />}
                  variant="outlined"
                  component="span"
                >
                  Add image
                </Button>
              </label>
            </Box>
          )}

          {uploadData.image?.trim() !== "" && (
            <img
              src={uploadData.image}
              alt={uploadData.image}
              style={{ height: "200px", objectFit: "contain" }}
            />
          )}

          <TextField
            fullWidth
            label="Title *"
            size="medium"
            error={uploadData.title?.trim() === ""}
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            sx={{ mt: 2, maxWidth: "500px" }}
            value={uploadData.title}
            onChange={(e) => {
              setUploadData((formData) => ({
                ...formData,
                title: e.target.value,
              }));
            }}
          />

          <Button
            fullWidth
            sx={{ mt: 2, maxWidth: "500px", height: "50px" }}
            variant="contained"
            startIcon={<Upload />}
            disabled={
              uploadData.title?.trim() === "" || uploadData.image?.trim() === ""
            }
            onClick={uploadImagesAndCreateRecord}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewImage;
