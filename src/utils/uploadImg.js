import imageCompression from "browser-image-compression";
import moment from "moment";
import { upload } from "./restUtils";

export const uploadImages = async (imgs) => {
  const filePromises = [imgs].map(async (path) => {
    const response = await fetch(path);
    const blob = await response.blob();

    return blob;
  });

  const blobsFromPath = await Promise.all(filePromises);

  const compressedFiles = await Promise.all(
    blobsFromPath.map(async (blob) => {
      const options = {
        maxSizeMB: 2,
        useWebWorker: true,
        maxIteration: 10,
        quality: 0.8,
      };
      const compressedBlob = await imageCompression(blob, options);
      const fileType = compressedBlob.type;
      const fileExtension = fileType.split("/").pop();
      const file = new File(
        [compressedBlob],
        `img_${moment().valueOf()}.${fileExtension}`,
        {
          type: fileType,
        }
      );
      return file;
    })
  );

  const formData = new FormData();
  compressedFiles.forEach((file) => {
    formData.append("files", file);
  });

  const uploadRes = await upload("upload", formData);

  if (!uploadRes || uploadRes?.status || uploadRes?.statusCode) {
    return [];
  }

  return uploadRes;
};
