
import { useState, useEffect } from "react";
import GroupRoom from "./GroupRoom/GroupRoom";
import PersonalRoom from "./PersonalRoom/PersonalRoom";
import SelectRoom from "./SelectRoom/SelectRoom";
const GroupStudy = () => {
  const [roomType, setRoomType] = useState("svsdv");

  const selectRoomFunc = () => {
    if (roomType === "PersonalRoom") {
      return <PersonalRoom />;
    } else if (roomType === "GroupRoom") {
      return <GroupRoom />;
    } else {
      return <SelectRoom roomType={roomType} setRoomType={setRoomType} />;
    }
  };
  return (
    <>
      <div className="GroupStudyBackground">
        {selectRoomFunc()}
      </div>
    </>
  );
};

export default GroupStudy;
