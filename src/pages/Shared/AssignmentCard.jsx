import React from "react";
import { useNavigate } from "react-router";

import useAuth from "../../Context/AuthContext/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const AssignmentCard = ({ assignment, setAssignments, bg }) => {
  const { _id, thumbnail, title, marks, difficulty } = assignment;
  const { user } = useAuth();

  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/assignments/${assignment._id}`);
  };
  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:5000/assignments/${id}`
    );
    if (data?.message === "Assignment deleted successfully") {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Assignment has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });

      setAssignments((prev) => prev.filter((a) => a._id !== id));
    } else {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Assignment not found or could not be deleted.",
      });
    }
  };

  return (
    <div
      className={`bg-white  ${
        bg ? bg : "bg-gray-800"
      }  rounded-lg shadow-md flex justify-between items-center gap-4 transition hover:shadow-lg`}
    >
      <div className="px-4 flex gap-4">
        <img
          src={thumbnail || "/default.jpg"}
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
          disabled={user?.email !== assignment.creatorEmail}
          onClick={() => navigate(`/update-assignment/${_id}`)}
          className="px-2 py-1 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-400
    disabled:opacity-50
    disabled:cursor-not-allowed cursor-pointer dark:bg-white/20 text-white rounded"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(_id)}
          disabled={user?.email !== assignment.creatorEmail}
          className="px-4 py-3 bg-red-400 hover:bg-red-500  disabled:bg-gray-400
    disabled:opacity-50
    disabled:cursor-not-allowed cursor-pointer dark:bg-white/20 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
