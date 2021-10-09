import React from "react";
import "./style.css";

const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        color: "rgb(241, 36, 77)",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          stroke="rgb(241, 36, 77)"
          strokeWidth="1"
          fill="none"
          points="20,1 40,40 1,40"
        />
        <text fill="rgb(241, 36, 77)" x="5" y="47">
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loading;
