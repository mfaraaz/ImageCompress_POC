import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";

const prettyByte = (byte) => (byte / 1024 / 1024).toFixed(2);

export const useTestImageCompression = (uris, sizeInMB = 5, clicked, save) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    for (const inputUri of uris) {
      const start = performance.now();
      const output = await compressHelper(inputUri);
      const end = performance.now();
      const time = (end - start).toFixed(2);
      if (save) {
        const inputBlob = URL.createObjectURL(inputUri);
        const ipName = `ip-${sizeInMB}-${output.name}`;
        const outputBlob = URL.createObjectURL(output);
        const opName = `op-${sizeInMB}-${output.name}`;
        saveAs(inputBlob, ipName);
        saveAs(outputBlob, opName);
      }
      const image = {
        name: output.name,
        timeInMS: time,
        size: output.size,
      };
      if (error) break;
      setImages((o) => [...o, image]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (uris) {
      setImages([]);
      compressImage();
    }
  }, [clicked]);

  return { images, loading, error };
};
