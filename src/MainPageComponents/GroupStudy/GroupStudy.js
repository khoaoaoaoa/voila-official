import React from "react";
import { useState, useEffect } from "react";
import GroupRoom from "./GroupRoom/GroupRoom";
import PersonalRoom from "./PersonalRoom/PersonalRoom";
const GroupStudy = () => {
 
  return (
    <>
      <div className="GroupStudyBackground">
       <GroupRoom/>
      </div>
    </>
  );
};

export default GroupStudy;
