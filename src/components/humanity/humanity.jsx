import React from "react";

import StatsContext from "context/stats";
import IconBox from "components/iconbox";

import HumanityIcon from "assets/humanity.png";
import StainIcon from "assets/moon.png";
import DegredationIcon from "assets/conflict.png";
import AddIcon from "assets/add.png";
import RemoveIcon from "assets/remove.png";

import "./humanity.less";

const MAX_HUMANITY = 10;

export class Humanity extends React.Component {
  constructor(props) {
    super(props);

    this.updateStains = this.updateStains.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.stats.humanity !== this.props.stats.humanity ||
      nextProps.stats.stains !== this.props.stats.stains
    );
  }

  updateStains(stains) {
    this.props.updateStats({ ...this.props.stats, stains });
  }

  render() {
    const { stats } = this.props || {};
    const { humanity, stains } = stats || {};

    return (
      <div className="humanity column centered">
        <p>HUMANITY</p>

        <div className="content row spaced">
          <button
            onClick={() => {
              this.updateStains(Math.max(0, stains - 1));
            }}
          >
            <IconBox icon={RemoveIcon} border={false} />
          </button>

          <div className="icons row centered wrap">
            {renderHumanityIcons(humanity, stains)}
          </div>

          <button
            onClick={() => {
              this.updateStains(Math.min(MAX_HUMANITY, stains + 1));
            }}
          >
            <IconBox icon={AddIcon} border={false} />
          </button>
        </div>

        <hr />
      </div>
    );
  }
}

const renderHumanityIcons = (humanity, stains) => {
  const icons = [];

  for (let n = 1; n <= MAX_HUMANITY; n += 1) {
    if (n + stains > MAX_HUMANITY) {
      icons.push(getStainOrDegredationIcon(n, humanity));
    } else if (n <= humanity) {
      icons.push(<IconBox key={n} icon={HumanityIcon} />);
    } else {
      icons.push(<IconBox key={n} />);
    }
  }

  return icons;
};

const getStainOrDegredationIcon = (count, humanity) => {
  if (count > humanity) {
    return <IconBox key={count} icon={StainIcon} />;
  } else {
    return <IconBox key={count} icon={DegredationIcon} />;
  }
};

export default () => (
  <StatsContext.Consumer>
    {context => <Humanity {...context} />}
  </StatsContext.Consumer>
);
