import React from "react";
import "./PersonalRoom.css";
import Webcam from "react-webcam";
import CallButton from "../Components/CallButton/CallButton";
import BackgroundCallButtonPanel from "../Components/BackgroundCallButtonPanel/BackgroundCallButtonPanel";
import { faMicrophone, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
const PersonalRoom = () => {
  return (
    <>
      <div className="PersonalRoomContainer">
        <div className="PersonalRoomCameraContainer">
          <div style={{ position: "relative", height: "fit-content" }}>
            <Webcam style={{ borderRadius: "2.5rem", width: "100%" }} />
            <div className="PersonalRoomFooterContainer">
              <BackgroundCallButtonPanel>
                <CallButton
                  icon={faVideo}
                  inlineStyle={{ backgroundColor: "#C2C1C4" }}
                />
                <CallButton
                  icon={faMicrophone}
                  inlineStyle={{ backgroundColor: "#C2C1C4" }}
                />
                <CallButton
                  icon={faCircleXmark}
                  inlineStyle={{ backgroundColor: "#DF6962" }}
                />
              </BackgroundCallButtonPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalRoom;
