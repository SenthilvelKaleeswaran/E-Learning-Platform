import React, { useState, useEffect } from "react";

const ProgressBar = ({ value }:any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= value) {
          clearInterval(interval);
          return value;
        }
        return prev + 1;
      });
    }, 1); 

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="w-full mx-auto space-y-4">
      <div className="w-full bg-gray-200 rounded-md h-1.5 overflow-hidden">
        <div
          className="bg-blue-500 h-1.5 rounded-md transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2">{progress}% Completed</p>
    </div>
  );
};

export default ProgressBar;
