import React, { useEffect, useRef, useState } from "react";
import ParticipantView from "./ParticipantView/ParticipantView";
import Controls from "./Controls/Controls";
import ScreenShareView from "./ScreenShareView/ScreenShareView";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Features from "./Features/Features";
import FeatureButtons from "./FeatureButtons/FeatureButtons";
import { roomsColRef } from "../../../../../Firebase/config";
import "./RoomView.css";

const RoomView = ({ participants, meetingId }) => {
  const [room, setRoom] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const timelineSubColRef = collection(roomsColRef, `${meetingId}`, "timeline");
  useEffect(() => {
    onSnapshot(doc(roomsColRef, meetingId), (snapshot) => {
      setRoom(snapshot.data());
    });
    onSnapshot(timelineSubColRef, (snapshot) => {
      setTimeline(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);
  console.log(participants);
  return (
    <div className="RoomView">
      <div className="RoomViewHeader">
        <h1>{room?.roomName}</h1>
        <button className="ValidateParticipantsButton">
          Bắt đầu buổi học!
        </button>
      </div>
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
          <Features />
        </div>
      </div>
      <div className="ControlSide">
        <Controls />
        <FeatureButtons />
      </div>
    </div>
  );
};

export default RoomView;
