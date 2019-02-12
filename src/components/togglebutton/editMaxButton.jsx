import React from "react";
import PropTypes from "prop-types";

import StatsContext from "context/stats";

import ToggleButton from "components/toggleButton";

export class EditMaxButton extends React.PureComponent {
  handlePress() {
    const { updateStats } = this.props;
    const { isEditingMax } = this.props.stats;

    updateStats({ ...this.props.stats, isEditingMax: !isEditingMax });
  }

  render() {
    const { isEditingMax } = this.props.stats;

    const buttonProps = {
      textOn: "Save",
      textOff: "Edit Max Values",
      isToggled: isEditingMax,
      handlePress: this.handlePress.bind(this)
    };

    return <ToggleButton {...buttonProps} />;
  }
}

EditMaxButton.propTypes = {
  updateStats: PropTypes.func.isRequired,
  stats: PropTypes.shape({ isEditingMax: PropTypes.bool }).isRequired
};

export const EditMaxButtonContext = () => (
  <StatsContext.Consumer>
    {context => <EditMaxButton {...context} />}
  </StatsContext.Consumer>
);

export default EditMaxButtonContext;
