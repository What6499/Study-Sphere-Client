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
  // Submission
  useEffect(() => {
    if (loading || !user) return;
    if (tab !== "my-submissions") return;
    const fetchSubmissions = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(
          "https://study-sphere-server-ten.vercel.app/submissions",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const { data } = response;

        setMySubmissions(data);
        setIsFetching(false);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };

    fetchSubmissions();
  }, [tab, user, loading]);

  // progress
  useEffect(() => {
    if (loading || !user) return;
    if (tab !== "my-progress") return;
    const fetchSubmissions = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(
          "https://study-sphere-server-ten.vercel.app/my-progress",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const { data } = response;

        setMyProgress(data);
        setIsFetching(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubmissions();
  }, [tab, user, loading]);
  const handleTabSwitch = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    const fetchMyAssignments = async () => {
      if (loading || !user) return;
      if (tab !== "my-assignments") return;
      try {
        const response = await axios.get(
          "https://study-sphere-server-ten.vercel.app/my-assignments",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        setMyAssignments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyAssignments();
  }, [tab, user, loading]);

  return (
    <div className="pt-24 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <h1 className="text-4xl mb-4 font-logo text-light-primary dark:text-white font-bold text-center lg:text-left">
              Dashboard
            </h1>
            <div className="w-full dark:bg-gray-800 rounded-lg bg-white text-light-primary dark:text-white text-center">
              <div
                onClick={() => handleTabSwitch("my-progress")}
                className={`w-full rounded-md text-gray-900 px-4 py-3 dark:text-white hover:bg-gray-500/20 cursor-pointer ${
                  tab === "my-progress" && "bg-green-300/70"
                }`}
              >
                My Progress
              </div>
              <div
                onClick={() => handleTabSwitch("my-submissions")}
                className={`w-full rounded-md px-4 text-gray-900 py-3 dark:text-white hover:bg-gray-500/20 cursor-pointer ${
                  tab === "my-submissions" && "bg-green-300/70"
                }`}
              >
                My Submissions
              </div>
              <div
                onClick={() => handleTabSwitch("my-assignments")}
                className={`w-full rounded-md text-gray-900 dark:text-white px-4 py-3 hover:bg-gray-500/20 cursor-pointer ${
                  tab === "my-assignments" && "bg-green-300/70"
                }`}
              >
                My Assignments
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <h2 className="text-3xl mb-3 text-center text-light-primary font-logo dark:text-white font-bold">
              {tab === "my-progress"
                ? "Your Progress"
                : tab === "my-assignments"
                ? "Your Assignments"
                : "Your Submissions"}
            </h2>
            <div
              className={`${
                tab === "my-progress" ? "" : "bg-gray-200/50 dark:bg-gray-800"
              } p-4 rounded-lg`}
            >
              {tab === "my-submissions" && (
                <MySubmissions
                  isFetching={isFetching}
                  mySubmissions={mySubmissions}
                  setMySubmissions={setMySubmissions}
                />
              )}

              {tab === "my-progress" && (
                <MyProgress progressData={myProgress} />
              )}

              {tab === "my-assignments" && (
                <MyAssignments assignments={myAssignments} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
