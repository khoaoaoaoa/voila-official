import React from "react";
import "./PersonalRoom.css";
import Webcam from "react-webcam";

const PersonalRoom = () => {
  return (
    <>
      <div className="PersonalRoomContainer">
        <div className="PersonalRoomHeaderContainer"></div>
        <div className="PersonalRoomCameraContainer">
          <Webcam
            style={{ borderRadius: "2rem", width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalRoom;
