import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";

import MaxValueHOC from "components/maxvalue";
import WillpowerDisplayHOC from "components/willpower/willpowerdisplayhoc";

export const WillpowerHOC = ({ stats, updateStats }) => {
  const maxValueProps = {
    stats,
    updateStats,
    valueKeyName: "willpower"
  };

  return stats.isEditingMax ? (
    <MaxValueHOC {...maxValueProps} />
  ) : (
    <WillpowerDisplayHOC stats={stats} updateStats={updateStats} />
  );
};

WillpowerHOC.propTypes = {
  stats: PropTypes.object.isRequired,
  updateStats: PropTypes.func.isRequired
};

const WillpowerContext = () => (
  <StatsContext.Consumer>
    {context => <WillpowerHOC {...context} />}
  </StatsContext.Consumer>
);

export default WillpowerContext;
