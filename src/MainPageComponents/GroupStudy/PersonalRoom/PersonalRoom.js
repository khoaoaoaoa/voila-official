import React from "react";
import "./PersonalRoom.css";
import Webcam from "react-webcam";
const PersonalRoom = () => {
  return (
    <>
      <div className="PersonalRoomContainer">
        <div className="PersonalRoomCameraContainer">
          <div style={{ position: "relative", height: "fit-content" }}>
            <Webcam style={{ borderRadius: "2.5rem", width: "100%" }} />
            <div className="PersonalRoomFooterContainer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalRoom;
