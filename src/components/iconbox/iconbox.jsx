import React from "react";

import "./iconbox.less";

const IconBox = ({ icon, border = true }) =>
  icon ? (
    <div className={getClass(border)}>
      <img src={icon} />
    </div>
  ) : (
    <div className={getClass(border)} />
  );

const getClass = border => (border ? "icon-box" : "icon-box no-border");

export default IconBox;
