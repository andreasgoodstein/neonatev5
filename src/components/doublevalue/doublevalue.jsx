import React from "react";
import PropTypes from "prop-types";

import IconBox from "components/iconbox";

import SuperficialIcon from "assets/slash.png";
import AggravatedIcon from "assets/fire.png";
import AddIcon from "assets/add.png";
import RemoveIcon from "assets/remove.png";

const HealthDisplay = ({
  updateSuperficial,
  updateAggravated,
  valueSuperficial,
  valueAggravated,
  valueMax,
  valueName,
  finalStatus
}) => (
  <div className="humanity column centered">
    <div className="content row spaced">
      <div className="column around auto-width">
        <button
          onClick={() => {
            updateSuperficial(Math.max(0, valueSuperficial - 1));
          }}
        >
          <IconBox icon={RemoveIcon} border={false} />
          <IconBox icon={SuperficialIcon} border={false} />
        </button>

        <button
          onClick={() => {
            updateAggravated(Math.max(0, valueAggravated - 1));
          }}
        >
          <IconBox icon={RemoveIcon} border={false} />
          <IconBox icon={AggravatedIcon} border={false} />
        </button>
      </div>

      <div className="column centered">
        <p>{valueName}</p>

        <div className="icons row centered wrap">
          {renderIcons(valueMax, valueSuperficial, valueAggravated)}
        </div>

        <div className="status row centered">
          <p>
            {getStatus(
              valueMax,
              valueSuperficial,
              valueAggravated,
              finalStatus
            )}
          </p>
        </div>
      </div>

      <div className="column around auto-width">
        <button
          onClick={() => {
            updateSuperficial(Math.min(valueMax + 1, valueSuperficial + 1));
          }}
        >
          <IconBox icon={AddIcon} border={false} />
          <IconBox icon={SuperficialIcon} border={false} />
        </button>

        <button
          onClick={() => {
            updateAggravated(Math.min(valueMax, valueAggravated + 1));
          }}
        >
          <IconBox icon={AddIcon} border={false} />
          <IconBox icon={AggravatedIcon} border={false} />
        </button>
      </div>
    </div>

    <hr />
  </div>
);

const renderIcons = (valueMax, valueSuperficial, valueAggravated) => {
  const icons = [];

  for (let n = 1; n <= valueMax; n += 1) {
    if (valueAggravated + n > valueMax) {
      icons.push(<IconBox key={n} icon={AggravatedIcon} />);
    } else if (valueSuperficial + n > valueMax) {
      icons.push(<IconBox key={n} icon={SuperficialIcon} />);
    } else if (valueSuperficial + valueAggravated + n > valueMax) {
      icons.push(<IconBox key={n} icon={SuperficialIcon} />);
    } else {
      icons.push(<IconBox key={n} />);
    }
  }

  return icons;
};

const getStatus = (
  valueMax,
  valueSuperficial,
  valueAggravated,
  finalStatus
) => {
  if (valueMax <= valueAggravated) {
    return finalStatus;
  } else if (valueMax <= valueSuperficial + valueAggravated) {
    return "IMPAIRED";
  }
};

HealthDisplay.propTypes = {
  updateSuperficial: PropTypes.func.isRequired,
  updateAggravated: PropTypes.func.isRequired,
  valueSuperficial: PropTypes.number.isRequired,
  valueAggravated: PropTypes.number.isRequired,
  valueMax: PropTypes.number.isRequired,
  valueName: PropTypes.string.isRequired,
  finalStatus: PropTypes.string.isRequired
};

export default HealthDisplay;
