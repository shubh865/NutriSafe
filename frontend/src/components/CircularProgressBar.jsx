import React from "react";

const CircularProgressBar = ({ progress }) => {
    
  const radius = 40; // Adjust as needed
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const strokeWidth = 15

  return (
    <svg className="progress-ring" width="120" height="120">
      <circle
        className="progress-ring__circle"
        stroke="rgba(0, 0, 0, 0.1)"
        strokeWidth={`${strokeWidth}`} // Adjust thickness here
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
      />
      <circle
        className="progress-ring__circle"
        stroke="#4CAF50"
        strokeWidth={`${strokeWidth}`}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
      />
    </svg>
  );
};

export default CircularProgressBar;
