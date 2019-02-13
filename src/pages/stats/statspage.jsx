import React from "react";

import Hunger from "components/hunger";
import Humanity from "components/humanity";
import Health from "components/health";
import WillPower from "components/willpower";
import EditMaxButton from "components/togglebutton/editMaxButton";

import "./statspage.less";

const StatsPage = () => {
  return (
    <div className="column around">
      <div className="stats-page column centered">
        <h1>NEONATE V5</h1>

        <Humanity />

        <WillPower />

        <Health />

        <Hunger />
      </div>

      <EditMaxButton />
    </div>
  );
};

export default StatsPage;
