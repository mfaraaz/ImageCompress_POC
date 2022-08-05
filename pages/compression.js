import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

const prettyByte = (byte) => (byte / 1024 / 1024).toFixed(2);

export const useImageCompression = (uris, sizeInMB = 5) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const compressHelper = async (inputUri) => {
    try {
      const output = await imageCompression(inputUri, {
        maxSizeMB: sizeInMB,
        useWebWorker: true,
      });
      return output;
    } catch (e) {
      setError(e);
    }
  };

  const compressImage = async () => {
    const newImages = [];

    for (const inputUri of uris) {
      const output = await compressHelper(inputUri);
      const image = {
        name: output.name,
        size: output.size,
      };
      if (error) break;
      newImages.push(image);
    }
    setImages(newImages);
  };

  useEffect(() => {
    if (uris) compressImage();
  }, [uris]);

  return { images, error };
};
