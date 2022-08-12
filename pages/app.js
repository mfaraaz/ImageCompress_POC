import Head from "next/head";
import React, { useState } from "react";
import { useTestImageCompression } from "../src/test-compression";

const prettyByte = (size) => (size / 1024 / 1024).toFixed(2);

const App = () => {
  const [files, setFiles] = useState([]);
  const [fs, setFs] = useState(5);
  const [clicked, setClicked] = useState(0);
  const [save, setSave] = useState(false);

  const { images, loading, error } = useTestImageCompression(
    files,
    fs,
    clicked,
    save
  );

  const totalTime = images.reduce((total, image) => {
    return total + parseInt(image?.timeInMS);
  }, 0);

  console.log("With Async-Await", totalTime);

  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com" />
      </Head>
      <div className="w-screen h-screen flex flex-col items-center mt-16">
        <div className="mb-3 w-96">
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
          <input
            type="checkbox"
            id="savefile"
            name="savefile"
            value={save}
            onClick={() => setSave((o) => !o)}
          />
          <label htmlFor="savefile"> save Images</label>
          <br />
          <button
            className="bg-blue-500 text-white p-2 rounded-md my-2"
            onClick={() => setClicked((o) => o + 1)}
          >
            Compress
          </button>
          <div className="flex">
            {loading && <p>Loading...</p>}
            <p>
              {images.length}/{files.length}
            </p>
          </div>
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
                      <td>#{idx + 1}</td>
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
