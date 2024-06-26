// src/components/StopButton.js
import React from 'react';

const StopButton = ({ movementhandlers }) => {
  const handleClick = () => {
    console.log('Stop button pressed');
    if (movementhandlers && movementhandlers.stop) {
      movementhandlers.stop();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white border border-black rounded p-2"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="black" style={{ transform: 'rotate(90deg)' }}>
        <polygon points="5,5 15,10 5,15" />
      </svg>
    </button>
  );
};

export default StopButton;