import React from "react";
import NavBar from "../src/pages/Shared/NavBar";

const Banner = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[url('/src/assets/Banner.jpg')] bg-cover bg-center filter blur-xs z-0"></div>
      <div className="absolute inset-0 bg-black/10 z-10 dark:bg-black/50"></div>
      <div className="relative z-30">
        <NavBar></NavBar>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-4">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Study Smarter, <span class="text-indigo-300">Together</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-100 mb-8 max-w-lg">
          Collaborate with classmates, submit assignments effortlessly, and
          boost your grades with StudySphere's powerful study tools.
        </p>
      </div>
    </div>
  );
};

export default Banner;
