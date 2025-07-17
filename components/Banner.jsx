import React from "react";
import NavBar from "../src/pages/Shared/NavBar";
import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";
const Banner = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[url('/src/assets/Banner.jpg')] bg-cover   blur-xs z-0"></div>
      <div className="absolute inset-0 bg-black/10 z-10 dark:bg-black/50"></div>
      <div className="relative z-30">
        <NavBar></NavBar>
      </div>

      <div className="relative z-20 flex flex-col text-center items-center container mx-auto justify-center  text-white h-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          class="text-6xl  font-bold mb-4"
        >
          Empower Your Learning, Together
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          class=" font-bold text-2xl text-white/80"
        >
          StudySphere brings students together to collaborate on assignments,
          share knowledge, and achieve academic goals as a team. Join a smarter,
          more connected way to learn.
        </motion.p>
        <button className="px-4 py-2 cursor-pointer rounded-md mt-3 bg-emerald-400  text-white border-none hover:bg-emerald-500 flex items-center justify-center">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
