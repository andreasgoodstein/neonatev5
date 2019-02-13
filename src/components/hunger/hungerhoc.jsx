import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";

import Hunger from "components/hunger/hunger";

export const HungerHOC = ({ stats, updateStats }) => {
  return stats.isEditingMax ? null : (
    <Hunger stats={stats} updateStats={updateStats} />
  );
};

HungerHOC.propTypes = {
  stats: PropTypes.object.isRequired,
  updateStats: PropTypes.func.isRequired
};

const HungerContext = () => (
  <StatsContext.Consumer>
    {context => <HungerHOC {...context} />}
  </StatsContext.Consumer>
);

export default HungerContext;
