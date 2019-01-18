import React from "react";

import StatsContext from "context/stats";
import IconBox from "components/iconbox";

import BloodIcon from "assets/drop.png";
import AddIcon from "assets/add.png";
import RemoveIcon from "assets/remove.png";

export class Hunger extends React.Component {
  constructor(props) {
    super(props);

    this.updateHunger = this.updateHunger.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.stats.hunger !== this.props.stats.hunger;
  }

  updateHunger(newHunger) {
    this.props.updateStats({ ...this.props.stats, hunger: newHunger });
  }

  render() {
    const { stats } = this.props || {};
    const { hunger } = stats || {};

    return (
      <div className="column centered">
        <p>HUNGER</p>

        <div className="content row spaced">
          <button
            onClick={() => {
              this.updateHunger(Math.max(0, hunger - 1));
            }}
          >
            <IconBox icon={RemoveIcon} border={false} />
          </button>

          <div className="icons row centered">{renderHungerIcons(hunger)}</div>

          <button
            onClick={() => {
              this.updateHunger(Math.min(5, hunger + 1));
            }}
          >
            <IconBox icon={AddIcon} border={false} />
          </button>
        </div>
      </div>
    );
  }
}

const renderHungerIcons = count => {
  const icons = [];

  for (let n = 0; n < 5; n += 1) {
    n < count
      ? icons.push(<IconBox key={n} icon={BloodIcon} />)
      : icons.push(<IconBox key={n} />);
  }

  return icons;
};

export default () => (
  <StatsContext.Consumer>
    {context => <Hunger {...context} />}
  </StatsContext.Consumer>
);
