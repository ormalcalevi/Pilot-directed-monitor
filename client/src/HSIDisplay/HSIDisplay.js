import React from "react";
import "./HSIDisplay.css";

const HSIDisplay = ({ heading }) => {
  return (
    <div className="his-container">
      <img
        src="/img/compass.png"
        alt="Compass"
        className="his-compass"
        style={{ transform: `rotate(${-(heading)}deg)` }}
      />
      <img
        src="/img/needle.png"
        alt="Needle"
        className="his-needle"
      />
    </div>
  );
};

export default HSIDisplay;
