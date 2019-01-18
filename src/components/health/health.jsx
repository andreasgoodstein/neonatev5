import React from "react";

import StatsContext from "context/stats";
import IconBox from "components/iconbox";

import SuperficialIcon from "assets/slash.png";
import aggravatedIcon from "assets/fire.png";
import AddIcon from "assets/add.png";
import RemoveIcon from "assets/remove.png";

class Health extends React.Component {
  constructor(props) {
    super(props);

    this.updateSuperficial = this.updateSuperficial.bind(this);
    this.updateaggravated = this.updateaggravated.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.stats.healthSuperficial !==
        this.props.stats.healthSuperficial ||
      nextProps.stats.healthAggravated !== this.props.stats.healthAggravated ||
      nextProps.stats.healthMax !== this.props.stats.healthMax
    );
  }

  updateSuperficial(healthSuperficial) {
    const { stats } = this.props;
    const { healthAggravated, healthMax } = stats;

    let newhealthAggravated = healthAggravated;

    if (healthSuperficial + healthAggravated > healthMax) {
      newhealthAggravated = Math.min(healthMax, healthAggravated + 1);
      healthSuperficial -= 2;
    }

    this.props.updateStats({
      ...stats,
      healthSuperficial,
      healthAggravated: newhealthAggravated
    });
  }

  updateaggravated(healthAggravated) {
    this.props.updateStats({ ...this.props.stats, healthAggravated });
  }

  render() {
    const { stats } = this.props || {};
    const { healthMax, healthSuperficial, healthAggravated } = stats || {};

    return (
      <div className="humanity column centered">
        <div className="content row spaced">
          <div className="column around auto-width">
            <button
              onClick={() => {
                this.updateSuperficial(Math.max(0, healthSuperficial - 1));
              }}
            >
              <IconBox icon={RemoveIcon} border={false} />
              <IconBox icon={SuperficialIcon} border={false} />
            </button>

            <button
              onClick={() => {
                this.updateaggravated(Math.max(0, healthAggravated - 1));
              }}
            >
              <IconBox icon={RemoveIcon} border={false} />
              <IconBox icon={aggravatedIcon} border={false} />
            </button>
          </div>

          <div className="column centered">
            <p>HEALTH</p>

            <div className="icons row centered wrap">
              {renderHealthIcons(
                healthMax,
                healthSuperficial,
                healthAggravated
              )}
            </div>

            <div className="status row centered">
              <p>
                {getHealthStatus(
                  healthMax,
                  healthSuperficial,
                  healthAggravated
                )}
              </p>
            </div>
          </div>

          <div className="column around auto-width">
            <button
              onClick={() => {
                this.updateSuperficial(
                  Math.min(healthMax + 1, healthSuperficial + 1)
                );
              }}
            >
              <IconBox icon={AddIcon} border={false} />
              <IconBox icon={SuperficialIcon} border={false} />
            </button>

            <button
              onClick={() => {
                this.updateaggravated(
                  Math.min(healthMax, healthAggravated + 1)
                );
              }}
            >
              <IconBox icon={AddIcon} border={false} />
              <IconBox icon={aggravatedIcon} border={false} />
            </button>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

const renderHealthIcons = (healthMax, healthSuperficial, healthAggravated) => {
  const icons = [];

  for (let n = 1; n <= healthMax; n += 1) {
    if (healthAggravated + n > healthMax) {
      icons.push(<IconBox key={n} icon={aggravatedIcon} />);
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

const HealthContext = () => (
  <StatsContext.Consumer>
    {context => <Health {...context} />}
  </StatsContext.Consumer>
);

export default HealthContext;
