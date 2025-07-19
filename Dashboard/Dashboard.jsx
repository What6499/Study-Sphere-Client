import React, { useState } from "react";
import MyAssignments from "./MySubmissions";

const Dashboard = () => {
  const [tab, setTab] = useState("my-progress");

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
        <div className="w-3/4 rounded-lg bg-gray-800">
          <MyAssignments></MyAssignments>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
