import React, { useCallback, useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import compress from "../src/compressfn";

const WorkerTest = () => {
  const [col, setCol] = useState("red");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file)
      for (let i = 0; i < 2; i++) {
        const w1 = new Worker(new URL("../src/worker2.ts", import.meta.url));
        if (file) w1.postMessage(file[0]);
        w1.onmessage = (evt) => console.log(evt.data);
      }
    return () => {
      // w1.terminate();
    };
  }, [file]);

  // const handleWork = useCallback(async () => {
  //   workerRef.current.postMessage(file[0]);
  //   workerRef2.current.postMessage(file[0]);
  // }, [file]);

  if (file) console.log(file[0].type);

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
      <button onClick={() => compress(file[0])}>CFN</button>
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
