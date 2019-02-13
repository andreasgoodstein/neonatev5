import React from "react";
import PropTypes from "prop-types";

import DoubleValue from "components/doublevalue";

class HealthDisplayHOC extends React.Component {
  constructor(props) {
    super(props);

    this.updateSuperficial = this.updateSuperficial.bind(this);
    this.updateAggravated = this.updateAggravated.bind(this);
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
    const { stats, updateStats } = this.props;
    const { healthAggravated, healthMax } = stats;

    let newhealthAggravated = healthAggravated;

    if (healthSuperficial + healthAggravated > healthMax) {
      newhealthAggravated = Math.min(healthMax, healthAggravated + 1);
      healthSuperficial -= 2;
    }

    updateStats({
      ...stats,
      healthSuperficial,
      healthAggravated: newhealthAggravated
    });
  }

  updateAggravated(healthAggravated) {
    const { stats, updateStats } = this.props;
    const { healthSuperficial, healthMax } = stats;

    const newHealthSuperficial =
      healthSuperficial + healthAggravated > healthMax
        ? Math.max(0, healthSuperficial - 1)
        : healthSuperficial;

    updateStats({
      ...stats,
      healthAggravated,
      healthSuperficial: newHealthSuperficial
    });
  }

  render() {
    const { stats } = this.props;
    const { healthMax, healthSuperficial, healthAggravated } = stats;

    const doubleValueProps = {
      updateSuperficial: this.updateSuperficial,
      updateAggravated: this.updateAggravated,
      valueSuperficial: healthSuperficial,
      valueAggravated: healthAggravated,
      valueMax: healthMax,
      valueName: "HEALTH",
      finalStatus: "TORPOR"
    };

    return <DoubleValue {...doubleValueProps} />;
  }
}

HealthDisplayHOC.propTypes = {
  stats: PropTypes.shape({
    healthMax: PropTypes.number,
    healthSuperficial: PropTypes.number,
    healthAggravated: PropTypes.number
  }).isRequired,
  updateStats: PropTypes.func.isRequired
};

export default HealthDisplayHOC;
