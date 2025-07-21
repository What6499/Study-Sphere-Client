import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.1,
            delay: index * 0.2,
            ease: "easeIn",
          }}
          key={key}
          className={`rounded-lg p-6 ${colors[index]} dark:bg-white/20 text-white shadow-lg flex flex-col items-center justify-center`}
        >
          <span className="text-4xl font-bold">{value}</span>
          <span className="mt-2 text-lg">{key}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default MyProgress;
