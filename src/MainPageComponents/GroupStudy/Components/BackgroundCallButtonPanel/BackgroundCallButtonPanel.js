import React from "react";
import "./BackgroundCallButtonPanel.css";
const BackgroundCallButtonPanel = ({ children, style }) => {
  return (
    <div className="BackgroundCallButtonPanel" style={{ ...style }}>
      {children}
    </div>
  );
};

export default BackgroundCallButtonPanel;
