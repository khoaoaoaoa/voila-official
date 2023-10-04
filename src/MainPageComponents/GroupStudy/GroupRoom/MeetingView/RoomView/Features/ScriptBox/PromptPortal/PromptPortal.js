import React from "react";
import "./PromptPortal.css";
const PromptPortal = ({ teacherInfo }) => {
  return (
    <>
      <div>
        {teacherInfo.time} {teacherInfo.content} {teacherInfo.teacherName}
      </div>
    </>
  );
};

export default PromptPortal;
