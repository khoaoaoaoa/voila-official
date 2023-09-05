import React from "react";
import "./GoalBar.css";
import GoalBox from "./GoalBox/GoalBox";
import CreateBox from "./CreateBox/CreateBox";
import { useState } from "react";
import PortalContainer from "../../../Components/PortalContainer/PortalContainer";
import { AnimatePresence } from "framer-motion";
import BoxSettings from "./BoxSettings/BoxSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
const GoalBar = () => {
  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const [isGoalBarCollapsed, setIsGoalBarCollapsed] = useState(false);

  return (
    <>
      <div
        className={
          isGoalBarCollapsed
            ? "GoalBarContainer --GoalBarCollapsed"
            : "GoalBarContainer"
        }>
        <div
          className="GoalBarAngles"
          onClick={() => {
            setIsGoalBarCollapsed(!isGoalBarCollapsed);
          }}>
          <FontAwesomeIcon
            icon={isGoalBarCollapsed ? faAnglesLeft : faAnglesRight}
          />
        </div>
        <h2>Thanh tiện ích</h2>
        <div className="GoalBarGridSystem">
          <GoalBox />
          <CreateBox
            isBoxClicked={isBoxClicked}
            setIsBoxClicked={setIsBoxClicked}
          />
        </div>
      </div>
      <AnimatePresence>
        {isBoxClicked && (
          <PortalContainer
            onClose={() => setIsBoxClicked(false)}
            className={"BoxSettingsContainer"}>
            <BoxSettings></BoxSettings>
          </PortalContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default GoalBar;
