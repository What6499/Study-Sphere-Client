import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900 px-6">
      <h1 className="text-8xl font-bold text-blue-600 dark:text-white mb-4">
        404
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
