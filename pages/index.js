import Head from "next/head";
import React, { useState } from "react";
import { useTestImageCompression } from "./test-compression";

const prettyByte = (size) => (size / 1024 / 1024).toFixed(2);

const App = () => {
  const [files, setFiles] = useState([]);
  const [fetch, setFetch] = useState(true);
  const { images, error } = useTestImageCompression(files, 5, fetch);

  console.log(images);

  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com" />
      </Head>
      <div className="w-screen h-screen flex flex-col items-center mt-16">
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
            onChange={(e) => {
              const files = [...e.target.files];
              // const uri = files.map((file) => URL.createObjectURL(file));
              setFiles(files);
            }}
            id="formFile"
            multiple
          />
          <table>
            <thead>
              <tr>
                <td>File #</td>
                <td>Original Size (in mb)</td>
                <td>Compressed Size (in mb)</td>
                <td>Time (in ms)</td>
              </tr>
            </thead>
            <tbody>
              {images.length > 0 &&
                images.map((image, idx) => {
                  return (
                    <tr key={idx}>
                      <td>#{idx}</td>
                      <td>{prettyByte(files[idx]?.size)}</td>
                      <td>{prettyByte(image.size)}</td>
                      <td>{image.timeInMS}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
