import React from "react";
import { useState } from "react";
import "./JoinScreen.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faRecordVinyl,
  faVideo,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
function JoinScreen({ getMeetingAndToken, handleCreateRoomFirebase, setWaitForRoom }) {
  const [meetingId, setMeetingId] = useState(null);

  const handleCreateRoom = async () => {
    const meetingId = await getMeetingAndToken(null);
    await handleCreateRoomFirebase(meetingId);
    setWaitForRoom(false);
  };

  return (
    <div className="JoinScreen">
      <h1>
        Tham gia phòng học thoiii <FontAwesomeIcon icon={faRecordVinyl} />{" "}
        <FontAwesomeIcon icon={faMusic} />{" "}
      </h1>
      <button
        onClick={async () => {
          await handleCreateRoom();
        }}
        className="CreateMeetingButton">
        <FontAwesomeIcon icon={faVideo} style={{ marginRight: "0.5rem" }} />
        <span>Create Meeting</span>
      </button>
      <p style={{ margin: "1rem 0" }}>hoặc</p>
      <div className="JoinScreenJoinPanel">
        <div className="JoinScreenInput">
          <FontAwesomeIcon icon={faKeyboard} />
          <input
            type="text"
            placeholder="Enter Meeting Id"
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            getMeetingAndToken(meetingId);
            setWaitForRoom(false);
          }}
          className="JoinMeetingButton"
          disabled={!meetingId}>
          Join
        </button>
      </div>
    </div>
  );
}
export default JoinScreen;
