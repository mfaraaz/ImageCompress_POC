import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
// import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

// const createWorker = createWorkerFactory(() => import("../public/worker2"));

const WorkerTest = () => {
  // const worker = useWorker(createWorker);
  // const worker2 = useWorker(createWorker);
  const [col, setCol] = useState("red");
  const [file, setFile] = useState(null);
  // useEffect(() => {
  //   if (Worker && file) {
  //     const w = new Worker("./worker.js");
  //     w.postMessage({ file });
  //     w.onmessage = (e) => {
  //       const res = e.data;
  //       console.log(res);
  //       w.terminate();
  //     };
  //   }
  // }, [file]);
  // if (file) console.log(file[0]);
  // useEffect(() => {
  //   (async () => {
  //     if (file) {
  //       Promise.all([worker.compress(file[0]), worker2.compress(file[1])]);
  //       compressImage();
  //     }
  //   })();
  // }, [worker, file]);

  console.log(file);

  const compressImage = async () => {
    const options = {
      maxSizeMB: 5,
      useWebWorker: true,
    };
    try {
      Promise.all([imageCompression(file[0], options)]).then((res) =>
        console.log(res)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: col }}>
      <p>WorkerTest</p>
      <button
        onClick={() =>
          setCol((old) => {
            if (old === "blue") return "red";
            return "blue";
          })
        }
      >
        Change
      </button>
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
          setFile(files);
        }}
        id="formFile"
        multiple
      />
      <button onClick={compressImage}>Compress</button>
    </div>
  );
};

export default WorkerTest;
