import React from "react";
import "./ADIDisplay.css"

const ADIDisplay = ({ adi }) => {
  // קביעה של הצבע לפי הערך
  const getADIColor = (adi) => {
    if (adi === 0) return "green";
    if (adi > 0) return "blue";
    return "yellow";
  };
  
  const backgroundColor = getADIColor(adi);
  
  return (
    <div
      className="adi-circle"
      style={{ backgroundColor }}
    >
      <p className="adi-label">{`ADI: ${adi}`}</p>
    </div>
  );
};

export default ADIDisplay;
