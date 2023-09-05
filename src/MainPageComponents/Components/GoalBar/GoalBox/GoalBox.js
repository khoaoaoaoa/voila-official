import React, { useState } from "react";
import "./GoalBox.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GoalBox = () => {
  const percentage = 66;

  return (
    <>
      {" "}
      <div className="GoalBoxContainer">
        <h3>Title</h3>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
    </>
  );
};

export default GoalBox;
