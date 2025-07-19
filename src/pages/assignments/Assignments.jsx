import React from "react";

const Assignments = () => {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Filters */}
        <aside className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full px-3 py-2 mb-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />

          {/* Difficulty Dropdown */}
          <div className="mb-2">
            <label
              htmlFor="difficulty"
              className="block mb-1 text-sm font-medium"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
            >
              <option value="">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </aside>

        {/* Main Content - Assignments */}
        <section className="lg:col-span-3 space-y-4">
          <h1 className="text-2xl font-bold mb-4">Assignments</h1>

          {/* Placeholder assignment cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Assignment Title {i + 1}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Short description of the assignment. Category, difficulty,
                  etc.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Assignments;
