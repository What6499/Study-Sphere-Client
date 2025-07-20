import React, { useEffect, useState } from "react";
import useAuth from "../src/Context/AuthContext/useAuth";
import axios from "axios";
import MyProgress from "./MyProgress";
import { useLocation } from "react-router";
import MySubmissions from "./MySubmissions";
import Swal from "sweetalert2";
import MyAssignments from "./MyAssignments";

const Dashboard = () => {
  const location = useLocation();
  const initialTab = location.state?.tab || "my-submissions";
  const [tab, setTab] = useState(initialTab);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [myProgress, setMyProgress] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { user, loading } = useAuth();

  // Fetch Submissions
  useEffect(() => {
    if (loading || !user || tab !== "my-submissions") return;
    const fetchSubmissions = async () => {
      setIsFetching(true);
      try {
        const { data } = await axios.get("http://localhost:5000/submissions", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setMySubmissions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSubmissions();
  }, [tab, user, loading]);

  // Fetch Progress
  useEffect(() => {
    if (loading || !user || tab !== "my-progress") return;
    const fetchProgress = async () => {
      setIsFetching(true);
      try {
        const { data } = await axios.get("http://localhost:5000/my-progress", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setMyProgress(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProgress();
  }, [tab, user, loading]);

  // Fetch Assignments
  useEffect(() => {
    if (loading || !user || tab !== "my-assignments") return;
    const fetchMyAssignments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/my-assignments",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        setMyAssignments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyAssignments();
  }, [tab, user, loading]);

  const handleTabSwitch = (tab) => setTab(tab);

  return (
    <div className="pt-24 bg-gray-100 dark:bg-gray-900 min-h-screen px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full">
          <h1 className="text-3xl mb-4 font-logo font-bold text-light-primary dark:text-white text-center lg:text-left">
            Dashboard
          </h1>
          <div className="w-full dark:bg-gray-800 bg-white rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
            {["my-progress", "my-submissions", "my-assignments"].map((item) => (
              <div
                key={item}
                onClick={() => handleTabSwitch(item)}
                className={`cursor-pointer px-4 py-3 text-center lg:text-left ${
                  tab === item
                    ? "bg-emerald-100 dark:bg-emerald-900"
                    : "hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                } transition duration-200`}
              >
                {item
                  .replace("my-", "My ")
                  .replace("submissions", "Submissions")
                  .replace("assignments", "Assignments")
                  .replace("progress", "Progress")}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-light-primary dark:text-white font-logo">
            {tab === "my-progress"
              ? "Your Progress"
              : tab === "my-assignments"
              ? "Your Assignments"
              : "Your Submissions"}
          </h2>
          <div
            className={`p-4 rounded-lg ${
              tab === "my-progress" ? "" : "bg-gray-200/50 dark:bg-gray-800"
            }`}
          >
            {tab === "my-submissions" && (
              <MySubmissions
                isFetching={isFetching}
                mySubmissions={mySubmissions}
                setMySubmissions={setMySubmissions}
              />
            )}
            {tab === "my-progress" && <MyProgress progressData={myProgress} />}
            {tab === "my-assignments" && (
              <MyAssignments assignments={myAssignments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
