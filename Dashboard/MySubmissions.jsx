import React from "react";
import { motion } from "motion/react";

const MySubmissions = ({ isFetching, mySubmissions }) => {
  if (isFetching) {
    return (
      <h1 className="text-gray-900 flex justify-center items-center h-full dark:text-gray-100">
        Loading
      </h1>
    );
  }
  if (mySubmissions?.length === 0) {
    return (
      <h1 className="text-gray-900 flex justify-center items-center h-full dark:text-gray-100">
        You have not submitted any assignments yet.
      </h1>
    );
  }

  return (
    <div className="  max-h-[calc(100vh-10rem)] overflow-y-auto">
      <div className="grid gap-4">
        {mySubmissions?.map((submission, index) => (
          <motion.div
            key={submission._id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.1,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md flex justify-between items-center gap-4 p-4 hover:shadow-lg transition"
          >
            <div className="flex gap-4 items-center">
              <img
                src={
                  submission.thumbnail ||
                  "https://i.ibb.co/pvGyYWpj/default.jpg"
                }
                alt="Thumbnail"
                className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              />

              <div>
                <h3 className="text-lg font-semibold text-light-primary dark:text-white">
                  {submission.title || "Untitled Assignment"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Marks: {submission.receivedMark || "?"}/{submission.marks} |
                  Status: {submission.status}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MySubmissions;
