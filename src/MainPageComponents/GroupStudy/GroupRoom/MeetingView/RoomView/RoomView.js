import React, { useEffect, useRef, useState } from "react";
import ParticipantView from "./ParticipantView/ParticipantView";
import Controls from "./Controls/Controls";
import ScreenShareView from "./ScreenShareView/ScreenShareView";
import "./RoomView.css";
const RoomView = ({ participants }) => {
  return (
    <div className="RoomView">
      <Controls />
      <div className={"CameraGrid"}>
        {[...participants.keys()].map((participantId) => (
          <>
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          </>
        ))}
        {[...participants.keys()].map((participantId) => (
          <>
            <ScreenShareView
              participantId={participantId}
              key={participantId}
            />
          </>
        ))}
      </div>
      <div className="FeatureSide"></div>
    </div>
  );
};

export default RoomView;
