import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";

import MaxValueHOC from "components/maxvalue";
import Humanity from "components/humanity/humanity";

export const HumanityHOC = ({ stats, updateStats }) => {
  const maxValueProps = {
    stats,
    updateStats,
    valueKeyName: "humanity"
  };

  return stats.isEditingMax ? (
    <MaxValueHOC {...maxValueProps} />
  ) : (
    <Humanity stats={stats} updateStats={updateStats} />
  );
};

HumanityHOC.propTypes = {
  stats: PropTypes.object.isRequired,
  updateStats: PropTypes.func.isRequired
};

const HumanityContext = () => (
  <StatsContext.Consumer>
    {context => <HumanityHOC {...context} />}
  </StatsContext.Consumer>
);

export default HumanityContext;
