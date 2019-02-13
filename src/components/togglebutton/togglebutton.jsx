import React from "react";
import PropTypes from "prop-types";

import "./toggleButton.less";

const ToggleButton = ({ textOn, textOff, handlePress, isToggled }) => {
  return (
    <div className="toggle-button">
      <button onClick={handlePress}>{isToggled ? textOn : textOff}</button>
    </div>
  );
};

ToggleButton.propTypes = {
  textOn: PropTypes.string.isRequired,
  textOff: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
  isToggled: PropTypes.bool.isRequired
};

export default ToggleButton;
