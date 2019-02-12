import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";

import HealthDisplayHOC from "components/health/healthdisplayhoc";
import HealthMaxDisplayHOC from "components/health/healthmaxdisplayhoc";

export const HealthHOC = ({ stats }) =>
  stats.isEditingMax ? <HealthMaxDisplayHOC /> : <HealthDisplayHOC />;

HealthHOC.propTypes = {
  stats: PropTypes.shape({ isEditingMax: PropTypes.bool.isRequired }).isRequired
};

const HealthHOCContext = () => (
  <StatsContext.Consumer>
    {context => <HealthHOC {...context} />}
  </StatsContext.Consumer>
);

export default HealthHOCContext;
