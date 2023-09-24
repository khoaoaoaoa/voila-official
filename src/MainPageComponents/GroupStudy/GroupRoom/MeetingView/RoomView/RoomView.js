import React, { useEffect, useRef, useState } from "react";
import ParticipantView from "./ParticipantView/ParticipantView";
import Controls from "./Controls/Controls";
import ScreenShareView from "./ScreenShareView/ScreenShareView";
import { onSnapshot, collection, doc } from "firebase/firestore";
import Features from "./Features/Features";
import FeatureButtons from "./FeatureButtons/FeatureButtons";
import "./RoomView.css";
const RoomView = ({ participants }) => {
  return (
    <div className="RoomView">
      <Controls />
      <FeatureButtons />
      <div className="FunctionalSide">
        <div className="CameraGrid">
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
        <div className="FeatureSide">
          <Features/>
        </div>
      </div>
    </div>
  );
};

export default RoomView;
