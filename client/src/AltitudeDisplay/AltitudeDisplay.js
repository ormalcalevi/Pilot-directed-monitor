import React from 'react';
import './AltitudeDisplay.css';

function AltitudeDisplay({ value }) {
    
  const height = 300; // גובה המלבן ב־px
  const maxAltitude = 3000;
  const clampedValue = Math.min(value, maxAltitude);
  const arrowPosition = (clampedValue / maxAltitude) * height;

  return (
    <div className="altitude-container">
      <div className="altitude-bar"> {/*המלבן עצמו במסך */}
        {/* החץ */}
        <div className="altitude-arrow" style={{ bottom: `${arrowPosition}px` }}>▲</div>

        {/* טווחים בצד */}
        <div className="altitude-scale">
          <span>3000</span>
          <span>2000</span>
          <span>1000</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}

export default AltitudeDisplay;
