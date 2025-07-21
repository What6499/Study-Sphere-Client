import React, { useEffect, useState, use } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../src/Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import useAuth from "../src/Context/AuthContext/useAuth";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [submission, setSubmission] = useState({ googleLink: "", note: "" });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://study-sphere-server-ten.vercel.app//assignments/${id}`
        );
        setAssignment(data);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);
    try {
      await axios
        .post("https://study-sphere-server-ten.vercel.app//submissions", {
          assignmentId: id,
          userEmail: user.email,
          googleLink: submission.googleLink,
          note: submission.note,
          title: assignment.title,
          marks: assignment.marks,
          creatorName: assignment.creatorName,
          status: "pending",
        })
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire("Assignment Submitted");
          }
        });

      setSubmission({ googleLink: "", note: "" });
      setShowModal(false);
    } catch {
      Swal.fire("Failed to submit assignment. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Loading assignment details...
        </p>
      </div>
    );

  if (!assignment)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Assignment not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <img
              src={
                assignment.thumbnail || "https://i.ibb.co/pvGyYWpj/default.jpg"
              }
              alt={assignment.title}
              className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500 shadow-lg flex-shrink-0"
            />
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
                {assignment.title}
              </h1>
              <p className="text-md text-gray-600 dark:text-gray-400 mb-1">
                Created by:{" "}
                <span className="font-semibold">
                  {assignment.creatorName || "Unknown"}
                </span>
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-sm text-gray-700 dark:text-gray-300 mt-2">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Due: {assignment.dueDate}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Difficulty:{" "}
                  <span className="font-medium ml-1">
                    {assignment.difficulty}
                  </span>
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2-2m0 0l2 2m-2-2v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2z"
                    ></path>
                  </svg>
                  Marks:{" "}
                  <span className="font-medium ml-1">{assignment.marks}</span>
                </span>
              </div>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-emerald-500 pb-2 inline-block">
              Description
            </h2>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
              {assignment.description}
            </p>
          </section>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              disabled={user?.email === assignment.creatorEmail}
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-emerald-500 disabled:bg-gray-400
    disabled:opacity-50
    disabled:cursor-not-allowed cursor-pointer text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75 text-lg"
            >
              Take Assignment
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-2xl flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md relative ">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
              Submit Your Assignment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="googleLink"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Google Docs Link
                </label>
                <input
                  type="url"
                  id="googleLink"
                  required
                  placeholder="e.g., https://docs.google.com/document/d/..."
                  onChange={(e) =>
                    setSubmission({ ...submission, googleLink: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="note"
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Quick Note (Optional)
                </label>
                <textarea
                  id="note"
                  placeholder="Add a note"
                  onChange={(e) =>
                    setSubmission({ ...submission, note: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Assignment"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetails;
