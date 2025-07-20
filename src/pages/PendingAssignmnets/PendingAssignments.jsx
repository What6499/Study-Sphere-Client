import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../Context/AuthContext/useAuth";
import { motion } from "motion/react";
const PendingAssignments = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [markValue, setMarkValue] = useState("");
  const [feedback, setFeedback] = useState("");
  const { user, loading } = useAuth();
  useEffect(() => {
    if (loading) return;
    const fetchPending = async () => {
      setIsFetching(true);
      try {
        const query = `?search=${search}`;
        const { data } = await axios.get(
          `http://localhost:5000/pending-assignments${query}`
        );
        setPendingSubmissions(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not load pending submissions", "error");
      } finally {
        setIsFetching(false);
      }
    };
    fetchPending();
  }, [search, loading]);

  const submitMark = async (e) => {
    e.preventDefault();
    if (!markValue || !feedback) {
      return Swal.fire("All fields required", "", "warning");
    }
    try {
      await axios.put(`http://localhost:5000/submissions/${selected._id}`, {
        receivedMark: Number(markValue),
        feedback,
      });
      Swal.fire("Success", "Submission marked", "success");

      setPendingSubmissions((prev) =>
        prev.filter((s) => s._id !== selected._id)
      );

      setSelected(null);
      setMarkValue("");
      setFeedback("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not submit mark", "error");
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-gray-900 dark:text-white px-3 py-2 mb-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none"
          />
        </aside>

        <section className="lg:col-span-3 space-y-4">
          {isFetching ? (
            <h1 className="text-center text-xl">Loading...</h1>
          ) : pendingSubmissions.length === 0 ? (
            <h1 className="text-center text-xl">
              No pending submissions found.
            </h1>
          ) : (
            <div className="space-y-4">
              {pendingSubmissions.map((submission, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.1,
                    delay: index * 0.2,
                    ease: "easeIn",
                  }}
                  key={submission._id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {submission.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      By: {submission.userEmail}
                    </p>
                  </div>
                  {user.email !== submission.userEmail && (
                    <button
                      onClick={() => setSelected(submission)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Give Mark
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Mark Submission
            </h1>
            <h1 className="text-gray-500">Maximum Score:{selected.marks}</h1>
            <p className="mb-2">
              <a
                href={selected.googleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Google Doc
              </a>
            </p>
            {selected.note && <p className="mb-4">Note: {selected.note}</p>}

            <form onSubmit={submitMark} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Marks
                </label>
                <input
                  type="number"
                  min={0}
                  max={selected.marks}
                  value={markValue}
                  onChange={(e) => setMarkValue(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Feedback
                </label>
                <textarea
                  value={feedback}
                  minLength={10}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssignments;
