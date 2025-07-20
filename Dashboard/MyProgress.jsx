import React, { useEffect, useState } from "react";

const MyProgress = ({ progressData }) => {
  console.log(progressData);
  const [progress, setProgress] = useState({
    created: 0,
    submitted: 0,
    marked: 0,
  });
  useEffect(() => {
    if (progressData) {
      setProgress(progressData);
    }
  }, [progressData]);
  console.log(progress);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="rounded-lg p-6 bg-blue-500/70 dark:bg-white/20 text-white shadow-lg flex flex-col items-center justify-center">
        <span className="text-4xl font-bold">{progress.created}</span>
        <span className="mt-2 text-lg">Created</span>
      </div>

      <div className="rounded-lg p-6 bg-green-500/70 dark:bg-white/20 text-white shadow-lg flex flex-col items-center justify-center">
        <span className="text-4xl font-bold">{progress.submitted}</span>
        <span className="mt-2 text-lg">Submitted</span>
      </div>

      <div className="rounded-lg p-6 bg-purple-500/70 dark:bg-white/20 text-white shadow-lg flex flex-col items-center justify-center">
        <span className="text-4xl font-bold">{progress.marked}</span>
        <span className="mt-2 text-lg">marked</span>
      </div>
    </div>
  );
};

export default MyProgress;
