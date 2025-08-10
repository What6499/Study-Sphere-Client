import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStudents = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://study-sphere-server-ten.vercel.app/leaderboard`
        );
        setLeaderboard(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not load top students", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchTopStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center  min-h-[400px] bg-white dark:bg-gray-900">
        <div className="text-center">
          <span className="loading loading-bars loading-xl text-emerald-500"></span>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-4">
            Loading leaderboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 bg-white dark:bg-gray-900 py-12  ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Leaderboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Top performing students ranked by average marks
          </p>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center pt-28 py-16">
            <div className="card bg-base-100 dark:bg-gray-800 w-96 mx-auto shadow-lg">
              <div className="card-body text-center">
                <h2 className="card-title justify-center text-gray-900 dark:text-white">
                  No Data Available
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  The leaderboard will appear once students complete their
                  assignments.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card  bg-white dark:bg-gray-800 shadow-lg ">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table  w-full">
                  <thead>
                    <tr className="bg-emerald-500 text-white   ">
                      <th className="text-white font-semibold text-base rounded-tl-lg">
                        Rank
                      </th>
                      <th className="text-white font-semibold text-base">
                        Student
                      </th>
                      <th className="text-white font-semibold text-base text-right rounded-tr-lg">
                        Average Mark
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map(
                      ({ email, name, photo, averageMark }, index) => (
                        <tr
                          key={email}
                          className=" dark:bg-gray-700 border-b-gray-400/30 border-dashed transition-colors duration-200"
                        >
                          <td className="font-bold text-lg">
                            <span
                              className={`${
                                index < 3
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              #{index + 1}
                            </span>
                          </td>

                          <td>
                            <div className="flex items-center space-x-4">
                              <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                  {photo ? (
                                    <img
                                      src={photo}
                                      alt={name}
                                      className="w-12 h-12 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                                      {name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold text-lg text-gray-900 dark:text-white">
                                  {name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {email}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="text-right">
                            <div className="badge badge-lg badge-success font-semibold">
                              {averageMark}
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
