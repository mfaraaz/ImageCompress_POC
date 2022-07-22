import imageCompression from "browser-image-compression";
import Head from "next/head";
import { useState } from "react";
export default function Home() {
  const [images, setImages] = useState({
    imageFile: null,
    inputImage: "",
    inputImageSize: null,
    outputImage: "",
    outputImageSize: null,
    isAvailable: false,
  });
  const [progress, setProgress] = useState(0);
  const [fs, setFs] = useState(5);

  const compressImage = async () => {
    const options = {
      maxSizeMB: fs,
      useWebWorker: true,
      onProgress: (p) => setProgress(p),
    };
    try {
      const compressedFile = await imageCompression(images.imageFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(`compressedFile size ${compressedFile.size / 1024} KB`); // smaller than maxSizeMB

      setImages((old) => {
        return {
          ...old,
          outputImage: URL.createObjectURL(compressedFile),
          outputImageSize: (compressedFile.size / 1024).toFixed(2),
          isAvailable: true,
        };
      });
      // write your own logic
      // await uploadToServer(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(images.inputImage.height);

  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    setImages((old) => {
      return { ...old, isAvailable: false, imageFile };
    });
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024} KB`);

    setImages((old) => {
      return {
        ...old,
        inputImage: URL.createObjectURL(imageFile),
        inputImageSize: (imageFile.size / 1024).toFixed(2),
      };
    });
  }

  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com" />
      </Head>
      <div className="w-screen h-screen flex flex-col items-center mt-20 ">
        <div className="">
          <label className="pr-3" htmlFor="fileSize">
            Max File Size (in MB): {fs}
          </label>
          <input
            type="range"
            value={fs}
            min={1}
            max={10}
            id="fileSize"
            onChange={(e) => setFs(e.target.value)}
          />

          <div className="mb-3 w-96">
            <label
              htmlFor="formFile"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Choose Your Image
            </label>
            <input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="formFile"
            />
          </div>
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={compressImage}
        >
          Compress
        </button>
        <p>Progress: {progress}%</p>
        {images.isAvailable && (
          <>
            <p>
              {`The Image size is ${(
                (images.outputImageSize / images.inputImageSize) *
                100
              ).toFixed(2)}% of the original image`}
            </p>

            <div className="p-4 bg-gray-200 w-[50%] my-2">
              <img src={images.inputImage} alt="ip image" />
              <p>Input Image: {images.inputImage}</p>
              <p>Input Size: {images.inputImageSize} KB</p>
            </div>
            <div className="p-4 bg-gray-200 w-[50%] my-2">
              <img src={images.outputImage} alt="op image" />
              <p>Output Image: {images.outputImage}</p>
              <p>Output Size: {images.outputImageSize} KB</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
