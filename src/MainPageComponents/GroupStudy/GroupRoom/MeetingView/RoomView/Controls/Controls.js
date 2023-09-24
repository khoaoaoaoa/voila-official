import React from "react";
import "./Controls.css";
import { useMeeting } from "@videosdk.live/react-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faDesktop,
  faMicrophone,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
function Controls() {
  const { leave, toggleMic, toggleWebcam, toggleScreenShare } = useMeeting();
  return (
    <div className="Controls">
      <button onClick={() => leave()}>
        <FontAwesomeIcon icon={faSignOut} />
      </button>
      <button onClick={() => toggleMic()}>
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
      <button onClick={() => toggleWebcam()}>
        <FontAwesomeIcon icon={faVideo} />
      </button>
      <button onClick={() => toggleScreenShare()}>
        <FontAwesomeIcon icon={faDesktop} />
      </button>
    </div>
  );
}
export default Controls;
