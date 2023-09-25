import { useState, useEffect } from "react";
import GroupRoom from "./GroupRoom/GroupRoom";
import PersonalRoom from "./PersonalRoom/PersonalRoom";
import SelectRoom from "./SelectRoom/SelectRoom";
import { Outlet, useNavigate } from "react-router-dom";
const GroupStudy = () => {
  const [roomType, setRoomType] = useState(null);
  const navigate = useNavigate();

  const selectRoomFunc = () => {
    if (roomType === "PersonalRoom") {
      navigate("personalRoom");
    } else if (roomType === "GroupRoom") {
      navigate("groupRoom");
    }
  };
  useEffect(() => {
    selectRoomFunc();
  }, [roomType]);
  console.log(roomType);
  return (
    <>
      <div className="GroupStudyBackground">
        {roomType ? (
          <Outlet />
        ) : (
          <SelectRoom roomType={roomType} setRoomType={setRoomType} />
        )}
      </div>
    </>
  );
};

export default GroupStudy;
