import React from "react";
import PropTypes from "prop-types";

import IconBox from "components/iconbox";

import HumanityIcon from "assets/humanity.png";
import StainIcon from "assets/moon.png";
import DegredationIcon from "assets/conflict.png";
import AddIcon from "assets/add.png";
import RemoveIcon from "assets/remove.png";

const MAX_HUMANITY = 10;

export class Humanity extends React.Component {
  constructor(props) {
    super(props);

    this.updateStains = this.updateStains.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.stats.humanityMax !== this.props.stats.humanityMax ||
      nextProps.stats.stains !== this.props.stats.stains
    );
  }

  updateStains(stains) {
    const { stats, updateStats } = this.props;

    updateStats({ ...stats, stains });
  }

  render() {
    const { stats } = this.props || {};
    const { humanityMax, stains } = stats || {};
    const title = "HUMANITY";

    return (
      <div className="humanity column centered">
        <p>{title}</p>

        <div className="content row spaced">
          <button
            onClick={() => {
              this.updateStains(Math.max(0, stains - 1));
            }}
          >
            <IconBox icon={RemoveIcon} border={false} />
          </button>

          <div className="column centered">
            <div className="icons row centered wrap">
              {renderHumanityIcons(humanityMax, stains)}
            </div>

            <div className="status">
              <p>{getStatus(humanityMax, stains)}</p>
            </div>
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

const renderHumanityIcons = (humanityMax, stains) => {
  const icons = [];

  for (let n = 1; n <= MAX_HUMANITY; n += 1) {
    if (n + stains > MAX_HUMANITY) {
      icons.push(getStainOrDegredationIcon(n, humanityMax));
    } else if (n <= humanityMax) {
      icons.push(<IconBox key={n} icon={HumanityIcon} />);
    } else {
      icons.push(<IconBox key={n} />);
    }
  }

  return icons;
};

const getStainOrDegredationIcon = (count, humanityMax) => {
  if (count > humanityMax) {
    return <IconBox key={count} icon={StainIcon} />;
  } else {
    return <IconBox key={count} icon={DegredationIcon} />;
  }
};

const getStatus = (humanityMax, stains) => {
  if (stains > 10 - humanityMax) {
    return "IMPAIRED";
  }
};

Humanity.propTypes = {
  stats: PropTypes.shape({
    humanityMax: PropTypes.number.isRequired,
    stains: PropTypes.number.isRequired
  }).isRequired,
  updateStats: PropTypes.func.isRequired
};

export default Humanity;
