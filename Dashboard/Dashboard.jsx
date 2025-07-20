import React, { useEffect, useState } from "react";

import useAuth from "../src/Context/AuthContext/useAuth";
import axios from "axios";
import MyProgress from "./MyProgress";
import { useLocation } from "react-router";
import MySubmissions from "./MySubmissions";
import Swal from "sweetalert2";
const Dashboard = () => {
  const location = useLocation();
  const initialTab = location.state?.tab || "my-submissions";
  const [tab, setTab] = useState(initialTab);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [myProgress, setMyProgress] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    if (tab !== "my-submissions") return;
    const fetchSubmissions = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("http://localhost:5000/submissions", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        const { data } = response;
        console.log("Fetched submissions:", data);
        setMySubmissions(data);
        setIsFetching(false);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };

    fetchSubmissions();
  }, [tab, user, loading]);
  useEffect(() => {
    if (loading || !user) return;
    if (tab !== "my-progress") return;
    const fetchSubmissions = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("http://localhost:5000/my-progress", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        const { data } = response;
        console.log("Fetched submissions:", data);
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
  return (
    <div className="pt-24 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className=" flex   gap-4 ">
          <div className="flex flex-col w-1/4">
            <h1 className="text-4xl mb-2 font-logo text-light-primary dark:text-white font-bold">
              Dashboard
            </h1>
            <div className="w-full  dark:bg-gray-800 rounded-lg bg-white text-light-primary dark:text-white text-center max-h-max">
              <div
                onClick={() => handleTabSwitch("my-progress")}
                className="w-full rounded-md px-4 py-3 hover:bg-gray-500/20"
              >
                My Progress
              </div>
              <div
                onClick={() => handleTabSwitch("my-submissions")}
                className="w-full rounded-md px-4 py-3 hover:bg-gray-500/20"
              >
                My Submissions
              </div>
              <div
                onClick={() => handleTabSwitch("my-assignments")}
                className="w-full rounded-md px-4 py-3 hover:bg-gray-500/20"
              >
                My Assignments
              </div>
            </div>
          </div>
          <div className="w-3/4 rounded-lg  ">
            <h2 className="text-3xl mb-3 text-center text-light-primary font-logo dark:text-white font-bold ">
              {tab === "my-progress"
                ? "Your Progress"
                : tab === "my-assignments"
                ? "Your Assignments"
                : "Your Submissions"}
            </h2>
            <div className="bg-gray-200/50 dark:bg-gray-800 p-4 rounded-lg">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
