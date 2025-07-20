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
  const colors = ["bg-blue-500/70", "bg-green-500/70", "bg-purple-500/70"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {Object.entries(progress).map(([key, value], index) => (
        <div
          key={key}
          className={`rounded-lg p-6 ${colors[index]} dark:bg-white/20 text-white shadow-lg flex flex-col items-center justify-center`}
        >
          <span className="text-4xl font-bold">{value}</span>
          <span className="mt-2 text-lg">{key}</span>
        </div>
      ))}
    </div>
  );
};

export default MyProgress;
