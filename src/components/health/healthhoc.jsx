import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";

import MaxValueHOC from "components/maxvalue";
import HealthDisplayHOC from "components/health/healthdisplayhoc";

export const HealthHOC = ({ stats, updateStats }) => {
  const maxValueProps = {
    stats,
    updateStats,
    valueKeyName: "health"
  };

  return stats.isEditingMax ? (
    <MaxValueHOC {...maxValueProps} />
  ) : (
    <HealthDisplayHOC stats={stats} updateStats={updateStats} />
  );
};

HealthHOC.propTypes = {
  stats: PropTypes.object.isRequired,
  updateStats: PropTypes.func.isRequired
};

const HealthContext = () => (
  <StatsContext.Consumer>
    {context => <HealthHOC {...context} />}
  </StatsContext.Consumer>
);

export default HealthContext;
