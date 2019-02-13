import React from "react";
import PropTypes from "prop-types";

import MaxValue from "components/maxvalue/maxvalue";

export class MaxValueHOC extends React.PureComponent {
  updateMaxValue(newMaxValue) {
    const { stats, updateStats, valueKeyName } = this.props;

    updateStats({ ...stats, [`${valueKeyName}Max`]: newMaxValue });
  }

  render() {
    const { valueKeyName, stats } = this.props;

    const maxValueProps = {
      title: `MAX ${valueKeyName.toUpperCase()}`,
      maxValue: stats[`${valueKeyName}Max`],
      updateMaxValue: this.updateMaxValue.bind(this)
    };

    return <MaxValue {...maxValueProps} />;
  }
}

MaxValueHOC.propTypes = {
  valueKeyName: PropTypes.string.isRequired,
  updateStats: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired
};

export default MaxValueHOC;
