import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

const prettyByte = (byte) => (byte / 1024 / 1024).toFixed(2);

export const useTestImageCompression = (uris, sizeInMB = 5) => {
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
    for (const inputUri of uris) {
      const start = performance.now();
      const output = await compressHelper(inputUri);
      const end = performance.now();
      const time = (end - start).toFixed(2);
      const image = {
        name: output.name,
        timeInMS: time,
        size: output.size,
      };
      if (error) break;
      setImages((o) => [...o, image]);
    }
  };

  useEffect(() => {
    if (uris) {
      setImages([]);
      compressImage();
    }
  }, [uris]);

  return { images, error };
};
