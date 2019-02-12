import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";

import HealthDisplay from "components/health/healthdisplay";

class HealthDisplayHOC extends React.Component {
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

    let newHealthSuperficial = healthSuperficial;

    if (healthSuperficial + healthAggravated > healthMax) {
      newHealthSuperficial = Math.max(0, healthSuperficial - 1);
    }

    updateStats({
      ...stats,
      healthAggravated,
      healthSuperficial: newHealthSuperficial
    });
  }

  render() {
    const { stats } = this.props;
    const { healthMax, healthSuperficial, healthAggravated } = stats;

    const healthDisplayProps = {
      healthMax,
      healthSuperficial,
      healthAggravated,
      updateSuperficial: this.updateSuperficial.bind(this),
      updateAggravated: this.updateAggravated.bind(this)
    };

    return <HealthDisplay {...healthDisplayProps} />;
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

const HealthDisplayContext = () => (
  <StatsContext.Consumer>
    {context => <HealthDisplayHOC {...context} />}
  </StatsContext.Consumer>
);

export default HealthDisplayContext;
