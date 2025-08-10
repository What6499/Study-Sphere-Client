import React, { useState, useEffect } from "react";
import axios from "axios";

const Students = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setDataLoading(true);
      try {
        const query = `?search=${search}`;
        const { data } = await axios.get(
          `https://study-sphere-server-ten.vercel.app/all-users${query}`
        );
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setDataLoading(false);
      }
    };
    fetchUsers();
  }, [search]);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-xl max-h-max shadow">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <input
            type="text"
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-gray-900 dark:text-white px-3 py-2 mb-4 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none"
          />
        </aside>

        <section className="lg:col-span-3">
          {dataLoading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
              <p className="text-xl text-gray-500">No students found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="p-6 flex flex-col items-center text-center">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Students;
