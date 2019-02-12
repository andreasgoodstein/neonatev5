import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";

import HealthMax from "components/health/healthmaxdisplay";

export class HealthMaxDisplayHOC extends React.PureComponent {
  updateHealthMax(healthMax) {
    const { updateStats } = this.props;

    updateStats({ ...this.props.stats, healthMax });
  }

  render() {
    const { healthMax } = this.props.stats;

    const healthMaxProps = {
      healthMax,
      updateHealthMax: this.updateHealthMax.bind(this)
    };

    return <HealthMax {...healthMaxProps} />;
  }
}

HealthMaxDisplayHOC.propTypes = {
  updateStats: PropTypes.func.isRequired,
  stats: PropTypes.shape({ healthMax: PropTypes.number }).isRequired
};

const HealthMaxDisplayContext = () => (
  <StatsContext.Consumer>
    {context => <HealthMaxDisplayHOC {...context} />}
  </StatsContext.Consumer>
);

export default HealthMaxDisplayContext;
