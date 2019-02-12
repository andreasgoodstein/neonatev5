import React from "react";
import PropTypes from "prop-types";

import IconBox from "components/iconbox";

import AddIcon from "assets/add.png";
import RemoveIcon from "assets/remove.png";

const HealthMax = ({ healthMax, updateHealthMax }) => (
  <div className="column centered">
    <p>HEALTH MAX</p>

    <div className="content row spaced">
      <button
        onClick={() => {
          updateHealthMax(Math.max(1, healthMax - 1));
        }}
      >
        <IconBox icon={RemoveIcon} border={false} />
      </button>

      <div className="icons row centered">
        <p>{healthMax}</p>
      </div>

      <button
        onClick={() => {
          updateHealthMax(Math.min(15, healthMax + 1));
        }}
      >
        <IconBox icon={AddIcon} border={false} />
      </button>
    </div>
  </div>
);

HealthMax.propTypes = {
  healthMax: PropTypes.number.isRequired,
  updateHealthMax: PropTypes.func.isRequired
};

export default HealthMax;
