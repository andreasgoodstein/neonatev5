import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";
import IconBox from "components/iconbox";

import SuperficialIcon from "assets/slash.png";
import aggravatedIcon from "assets/fire.png";
import AddIcon from "assets/add.png";
import RemoveIcon from "assets/remove.png";

class WillPower extends React.Component {
  constructor(props) {
    super(props);

    this.updateSuperficial = this.updateSuperficial.bind(this);
    this.updateaggravated = this.updateaggravated.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.stats.willpowerSuperficial !==
        this.props.stats.willpowerSuperficial ||
      nextProps.stats.willpowerAggravated !==
        this.props.stats.willpowerAggravated ||
      nextProps.stats.willpowerMax !== this.props.stats.willpowerMax
    );
  }

  updateSuperficial(willpowerSuperficial) {
    const { stats, updateStats } = this.props;
    const { willpowerAggravated, willpowerMax } = stats;

    let newwillpowerAggravated = willpowerAggravated;

    if (willpowerSuperficial + willpowerAggravated > willpowerMax) {
      newwillpowerAggravated = Math.min(willpowerMax, willpowerAggravated + 1);
      willpowerSuperficial -= 2;
    }

    updateStats({
      ...stats,
      willpowerSuperficial,
      willpowerAggravated: newwillpowerAggravated
    });
  }

  updateaggravated(willpowerAggravated) {
    const { stats, updateStats } = this.props;
    const { willpowerSuperficial, willpowerMax } = stats;

    let newWillpowerSuperficial = willpowerSuperficial;

    if (willpowerSuperficial + willpowerAggravated > willpowerMax) {
      newWillpowerSuperficial = Math.max(0, willpowerSuperficial - 1);
    }

    updateStats({
      ...stats,
      willpowerAggravated,
      willpowerSuperficial: newWillpowerSuperficial
    });
  }

  render() {
    const { stats } = this.props || {};
    const { willpowerMax, willpowerSuperficial, willpowerAggravated } =
      stats || {};

    return (
      <div className="humanity column centered">
        <div className="content row spaced">
          <div className="column around auto-width">
            <button
              onClick={() => {
                this.updateSuperficial(Math.max(0, willpowerSuperficial - 1));
              }}
            >
              <IconBox icon={RemoveIcon} border={false} />
              <IconBox icon={SuperficialIcon} border={false} />
            </button>

            <button
              onClick={() => {
                this.updateaggravated(Math.max(0, willpowerAggravated - 1));
              }}
            >
              <IconBox icon={RemoveIcon} border={false} />
              <IconBox icon={aggravatedIcon} border={false} />
            </button>
          </div>

          <div className="column centered">
            <p>WILLPOWER</p>

            <div className="icons row centered wrap">
              {renderwillpowerIcons(
                willpowerMax,
                willpowerSuperficial,
                willpowerAggravated
              )}
            </div>

            <div className="status row centered">
              <p>
                {getwillpowerStatus(
                  willpowerMax,
                  willpowerSuperficial,
                  willpowerAggravated
                )}
              </p>
            </div>
          </div>

          <div className="column around auto-width">
            <button
              onClick={() => {
                this.updateSuperficial(
                  Math.min(willpowerMax + 1, willpowerSuperficial + 1)
                );
              }}
            >
              <IconBox icon={AddIcon} border={false} />
              <IconBox icon={SuperficialIcon} border={false} />
            </button>

            <button
              onClick={() => {
                this.updateaggravated(
                  Math.min(willpowerMax, willpowerAggravated + 1)
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

const renderwillpowerIcons = (
  willpowerMax,
  willpowerSuperficial,
  willpowerAggravated
) => {
  const icons = [];

  for (let n = 1; n <= willpowerMax; n += 1) {
    if (willpowerAggravated + n > willpowerMax) {
      icons.push(<IconBox key={n} icon={aggravatedIcon} />);
    } else if (willpowerSuperficial + n > willpowerMax) {
      icons.push(<IconBox key={n} icon={SuperficialIcon} />);
    } else if (willpowerSuperficial + willpowerAggravated + n > willpowerMax) {
      icons.push(<IconBox key={n} icon={SuperficialIcon} />);
    } else {
      icons.push(<IconBox key={n} />);
    }
  }

  return icons;
};

const getwillpowerStatus = (
  willpowerMax,
  willpowerSuperficial,
  willpowerAggravated
) => {
  if (willpowerMax <= willpowerAggravated) {
    return "Breakdown";
  } else if (willpowerMax <= willpowerSuperficial + willpowerAggravated) {
    return "Impaired";
  }
};

WillPower.propTypes = {
  updateStats: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    willpowerSuperficial: PropTypes.number.isRequired,
    willpowerAggravated: PropTypes.number.isRequired,
    willpowerMax: PropTypes.number.isRequired
  }).isRequired
};

const WillpowerContext = () => (
  <StatsContext.Consumer>
    {context => <WillPower {...context} />}
  </StatsContext.Consumer>
);

export default WillpowerContext;
