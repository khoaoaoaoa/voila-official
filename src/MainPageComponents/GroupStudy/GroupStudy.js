import { useState, useEffect } from "react";
import GroupRoom from "./GroupRoom/GroupRoom";
import PersonalRoom from "./PersonalRoom/PersonalRoom";
import SelectRoom from "./SelectRoom/SelectRoom";
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const GroupStudy = () => {
  let location = useLocation();
  const { meetingId: meetingParamsId } = useParams();
  const [roomType, setRoomType] = useState(null);
  const navigate = useNavigate();
  console.log(location);
  const selectRoomFunc = () => {
    if (roomType === "PersonalRoom") {
      navigate("personalRoom");
    } else if (roomType === "GroupRoom") {
      navigate("groupRoom");
    }
  };
  
  useEffect(() => {
    if(meetingParamsId){
      setRoomType("meetingParamsId");
    }
  }, [meetingParamsId])
  useEffect(() => {
    selectRoomFunc();
  }, [roomType]);
  console.log(roomType);
  useEffect(() => {
    if (location.pathname.includes("/main/groupStudy/groupRoom")) {
      setRoomType("meetingOK");
    } else if (location.pathname.includes("/main/groupStudy")) {
      setRoomType(null);
    }
  }, [location]);

  return (
    <>
      <div className="GroupStudyBackground">
        {roomType ? (
          <>
            <Outlet />
          </>
        ) : (
          <>
            <SelectRoom roomType={roomType} setRoomType={setRoomType} />
          </>
        )}
      </div>
    </>
  );
};

export default GroupStudy;
