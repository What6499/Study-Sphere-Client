import React, { useState, useEffect } from "react";
import axios from "axios";
import AssignmentCard from "../Shared/AssignmentCard";
import Swal from "sweetalert2";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setDataLoading(true);
      const query = `?search=${search}&difficulty=${difficulty}`;
      const { data } = await axios.get(
        `http://localhost:5000/assignments${query}`
      );
      setAssignments(data);
      setDataLoading(false);
    };

    fetchAssignments();
  }, [search, difficulty]);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-xl max-h-max shadow">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-gray-900 dark:text-white px-3 py-2 mb-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none"
          />

          <label
            className="block mb-1 text-sm font-medium"
            htmlFor="difficulty"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </aside>

        <section className="lg:col-span-3 space-y-4">
          {dataLoading ? (
            <p className="text-center">Loading...</p>
          ) : assignments.length === 0 ? (
            <p className="text-center text-gray-500">No assignments found.</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <AssignmentCard
                  setAssignments={setAssignments}
                  key={assignment._id}
                  assignment={assignment}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Assignments;
