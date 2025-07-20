import React from "react";

const PendingAssignmentCard = ({ submission, onGiveMark, isFetching }) => {
  console.log(isFetching);
  const { title, marks, creatorName, _id } = submission;
  if (isFetching) {
    return (
      <h1 className="text-gray-900 pt-24 flex justify-center items-center h-full dark:text-gray-100">
        Loading
      </h1>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center gap-4 transition hover:shadow-lg px-4 py-4">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title || "Untitled Assignment"}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Marks: {marks ?? "?"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Examinee: {creatorName || "Unknown"}
        </p>
      </div>

      <button
        onClick={() => onGiveMark(_id)}
        className="px-4 py-2 bg-green-500 dark:bg-white/20 hover:bg-green-600 text-white rounded-md"
      >
        Give Mark
      </button>
    </div>
  );
};

export default PendingAssignmentCard;
