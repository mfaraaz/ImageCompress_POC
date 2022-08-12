import imageCompression from "browser-image-compression";
const compressImage = async (file) => {
  console.log("FILE://", file, typeof file);
  const options = {
    maxSizeMB: 5,
    useWebWorker: false,
  };
  debugger;
  const image = await imageCompression(file, options);
  console.log(image);
};

export default compressImage;
