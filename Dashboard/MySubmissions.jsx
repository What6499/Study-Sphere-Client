import axios from "axios";
import React, { use, useEffect, useState } from "react";

import { useNavigate } from "react-router";

const MyAssignments = ({ isFetching, mySubmissions }) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/assignments/${mySubmissions._id}`);
  };
  if (isFetching) {
    return (
      <h1 className="text-gray-900 flex justify-center items-center h-full dark:text-gray-100">
        Loading
      </h1>
    );
  }
  if (mySubmissions.length === 0) {
    return (
      <h1 className="text-gray-900 flex justify-center items-center h-full dark:text-gray-100">
        You have not submitted any assignments yet.
      </h1>
    );
  }

  return (
    <div className="p-4  min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        My Submissions ({mySubmissions.length}) / Total ({})
      </h2>

      <div className="grid gap-4">
        {mySubmissions.map((submission) => (
          <div
            key={submission._id}
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {submission.title || "Untitled Assignment"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Marks: {submission.marks || "?"} | Difficulty:{" "}
                  {submission.difficulty || "?"}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 pr-4 py-4">
              <button
                onClick={handleView}
                className="px-2 py-1   hover:bg-white/30 text-white rounded"
              >
                View
              </button>
              <button
                onClick={() => console.log("up", _id)}
                className="px-2 py-1  hover:bg-white/30 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => console.log("del", _id)}
                className="px-4 py-3  hover:bg-white/30 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAssignments;
