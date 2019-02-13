import React from "react";
import PropTypes from "prop-types";

import DoubleValue from "components/doublevalue";

class WillPower extends React.Component {
  constructor(props) {
    super(props);

    this.updateSuperficial = this.updateSuperficial.bind(this);
    this.updateAggravated = this.updateAggravated.bind(this);
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

  updateAggravated(willpowerAggravated) {
    const { stats, updateStats } = this.props;
    const { willpowerSuperficial, willpowerMax } = stats;

    const newWillpowerSuperficial =
      willpowerSuperficial + willpowerAggravated > willpowerMax
        ? Math.max(0, willpowerSuperficial - 1)
        : willpowerSuperficial;

    updateStats({
      ...stats,
      willpowerAggravated,
      willpowerSuperficial: newWillpowerSuperficial
    });
  }

  render() {
    const { stats } = this.props;
    const { willpowerMax, willpowerSuperficial, willpowerAggravated } = stats;

    const doubleValueProps = {
      updateSuperficial: this.updateSuperficial,
      updateAggravated: this.updateAggravated,
      valueSuperficial: willpowerSuperficial,
      valueAggravated: willpowerAggravated,
      valueMax: willpowerMax,
      valueName: "WILLPOWER",
      finalStatus: "BREAKDOWN"
    };

    return <DoubleValue {...doubleValueProps} />;
  }
}

WillPower.propTypes = {
  updateStats: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    willpowerSuperficial: PropTypes.number.isRequired,
    willpowerAggravated: PropTypes.number.isRequired,
    willpowerMax: PropTypes.number.isRequired
  }).isRequired
};

export default WillPower;
