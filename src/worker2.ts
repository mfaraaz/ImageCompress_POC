// This is a module worker, so we can use imports (in the browser too!)
import compressImage from "./compressfn";
import axios from "axios";

const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));

addEventListener("message", async (event) => {
  const file = event.data;
  console.log(typeof file, file);
  await compressImage(file);
  // const x = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
  //   (response) => response.json()
  // );
  // console.log(x);
  const data = await axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then(function (response) {
      // handle success
      return response.data;
    });
  // console.log(res);
  // const r = fib(event.data);
  postMessage(data);
});
