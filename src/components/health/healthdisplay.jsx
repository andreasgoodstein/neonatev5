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
  healthSuperficial,
  healthAggravated,
  healthMax
}) => (
  <div className="humanity column centered">
    <div className="content row spaced">
      <div className="column around auto-width">
        <button
          onClick={() => {
            updateSuperficial(Math.max(0, healthSuperficial - 1));
          }}
        >
          <IconBox icon={RemoveIcon} border={false} />
          <IconBox icon={SuperficialIcon} border={false} />
        </button>

        <button
          onClick={() => {
            updateAggravated(Math.max(0, healthAggravated - 1));
          }}
        >
          <IconBox icon={RemoveIcon} border={false} />
          <IconBox icon={AggravatedIcon} border={false} />
        </button>
      </div>

      <div className="column centered">
        <p>HEALTH</p>

        <div className="icons row centered wrap">
          {renderHealthIcons(healthMax, healthSuperficial, healthAggravated)}
        </div>

        <div className="status row centered">
          <p>
            {getHealthStatus(healthMax, healthSuperficial, healthAggravated)}
          </p>
        </div>
      </div>

      <div className="column around auto-width">
        <button
          onClick={() => {
            updateSuperficial(Math.min(healthMax + 1, healthSuperficial + 1));
          }}
        >
          <IconBox icon={AddIcon} border={false} />
          <IconBox icon={SuperficialIcon} border={false} />
        </button>

        <button
          onClick={() => {
            updateAggravated(Math.min(healthMax, healthAggravated + 1));
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

const renderHealthIcons = (healthMax, healthSuperficial, healthAggravated) => {
  const icons = [];

  for (let n = 1; n <= healthMax; n += 1) {
    if (healthAggravated + n > healthMax) {
      icons.push(<IconBox key={n} icon={AggravatedIcon} />);
    } else if (healthSuperficial + n > healthMax) {
      icons.push(<IconBox key={n} icon={SuperficialIcon} />);
    } else if (healthSuperficial + healthAggravated + n > healthMax) {
      icons.push(<IconBox key={n} icon={SuperficialIcon} />);
    } else {
      icons.push(<IconBox key={n} />);
    }
  }

  return icons;
};

const getHealthStatus = (healthMax, healthSuperficial, healthAggravated) => {
  if (healthMax <= healthAggravated) {
    return "Torpor";
  } else if (healthMax <= healthSuperficial + healthAggravated) {
    return "Impaired";
  }
};

HealthDisplay.propTypes = {
  updateSuperficial: PropTypes.func.isRequired,
  updateAggravated: PropTypes.func.isRequired,
  healthSuperficial: PropTypes.number.isRequired,
  healthAggravated: PropTypes.number.isRequired,
  healthMax: PropTypes.number.isRequired
};

export default HealthDisplay;
