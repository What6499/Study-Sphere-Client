import React from "react";
import { useNavigate } from "react-router";

const AssignmentCard = ({ assignment }) => {
  const { _id, thumbnail, title, marks, difficulty } = assignment;
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/assignments/${assignment._id}`);
  };
  return (
    <div className="bg-white  dark:bg-gray-800  rounded-lg shadow-md flex justify-between items-center gap-4 transition hover:shadow-lg">
      <div className="px-4 flex gap-4">
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Marks: {marks} | Difficulty: {difficulty}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 pr-4 py-4">
        <button
          onClick={handleView}
          className="px-2 py-1  bg-blue-400 hover:bg-blue-500 dark:bg-white/20 cursor-pointer text-white rounded"
        >
          View
        </button>
        <button
          onClick={() => console.log("up", _id)}
          className="px-2 py-1 bg-orange-400 hover:bg-orange-500 cursor-pointer dark:bg-white/20 text-white rounded"
        >
          Update
        </button>
        <button
          onClick={() => console.log("del", _id)}
          className="px-4 py-3 bg-red-400 hover:bg-red-500 cursor-pointer dark:bg-white/20 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
