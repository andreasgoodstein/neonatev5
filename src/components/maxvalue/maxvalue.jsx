import React from "react";
import PropTypes from "prop-types";

import IconBox from "components/iconbox";

import AddIcon from "assets/add.png";
import RemoveIcon from "assets/remove.png";

const updateMaxValue = ({ title, maxValue, updateMaxValue }) => (
  <div className="column centered">
    <p>{title}</p>

    <div className="content row spaced">
      <button
        onClick={() => {
          updateMaxValue(Math.max(1, maxValue - 1));
        }}
      >
        <IconBox icon={RemoveIcon} border={false} />
      </button>

      <div className="icons row centered">
        <p>
          <b>{maxValue}</b>
        </p>
      </div>

      <button
        onClick={() => {
          updateMaxValue(Math.min(15, maxValue + 1));
        }}
      >
        <IconBox icon={AddIcon} border={false} />
      </button>
    </div>
  </div>
);

updateMaxValue.propTypes = {
  title: PropTypes.string.isRequired,
  maxValue: PropTypes.number.isRequired,
  updateMaxValue: PropTypes.func.isRequired
};

export default updateMaxValue;
