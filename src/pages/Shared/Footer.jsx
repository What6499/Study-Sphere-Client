import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] dark:bg-gray-800 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          StudySphere
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Empowering students to learn, share, and grow — together.
        </p>

        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black dark:hover:text-white"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} StudySphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
