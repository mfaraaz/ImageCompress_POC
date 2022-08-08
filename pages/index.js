import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com" />
      </Head>
      <div className="w-screen h-screen flex flex-col items-center mt-16">
        <button onClick={() => router.push("/home")}>Single Image</button>
        <button onClick={() => router.push("/app")}>Multi Image</button>
      </div>
    </>
  );
};

export default Home;
