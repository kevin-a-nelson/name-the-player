import React from "react";

const CustomInput = ({ value, handleChange }) => {
  return (
    <input
      onChange={handleChange}
      class="player-input"
      type="text"
      value={value}
      placeholder="Enter a Player"
    />
  );
};

export default CustomInput;
