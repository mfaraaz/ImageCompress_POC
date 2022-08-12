const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));

const worker = () => {
  let scriptImported;
  self.addEventListener("message", async (e) => {
    const { file } = e.data;
    try {
      if (!scriptImported) {
        // console.log('[worker] importScripts', imageCompressionLibUrl)
        // self.importScripts(
        //   "https://cdnjs.cloudflare.com/ajax/libs/core-js/3.21.1/minified.min.js"
        // );
        scriptImported = true;
      }

      const compressedFile = await imageCompression(file);
      self.postMessage({ file: compressedFile });

      // console.log('[worker] self', self)
    } catch (e) {
      // console.error('[worker] error', e)
      self.postMessage({ error: e.message + "\\n" + e.stack });
    }
  });
  // self.onmessage = (e) => {
  //   const { file } = e.data;

  //   self.importScripts(
  //     "https://cdnjs.cloudflare.com/ajax/libs/core-js/3.21.1/minified.min.js"
  //   );
  //   try {
  //     imageCompression(inputUri, { maxSizeMB: 5 }).then((res) =>
  //       console.log("RES", res)
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   console.log(self);

  //   console.log(file);
  //   const startTime = new Date().getTime();

  //   self.postMessage({
  //     file,
  //   });
  // };
};
worker();
