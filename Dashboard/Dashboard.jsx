import React, { useEffect, useState } from "react";
import MyAssignments from "./MySubmissions";
import useAuth from "../src/Context/AuthContext/useAuth";
import axios from "axios";

const Dashboard = () => {
  const [tab, setTab] = useState("my-submissions");
  const [mySubmissions, setMySubmissions] = useState([]);
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

  return (
    <div className="pt-24 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl flex gap-4 mx-auto">
        <div className="w-1/4 bg-white/60 dark:bg-gray-800 rounded-lg dark:text-gray-100 text-gray-900 text-center ">
          {" "}
          <div className="w-full rounded-md px-4 py-3 hover:bg-gray-500/20">
            My Progress
          </div>
          <div className="w-full rounded-md px-4 py-3 hover:bg-gray-500/20">
            My Submissions
          </div>
          <div className="w-full rounded-md px-4 py-3 hover:bg-gray-500/20">
            My Assignments
          </div>
        </div>
        <div className="w-3/4 rounded-lg">
          <MyAssignments
            isFetching={isFetching}
            mySubmissions={mySubmissions}
          ></MyAssignments>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
