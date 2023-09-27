import React, { useEffect, useRef, useState } from "react";
import ParticipantView from "./ParticipantView/ParticipantView";
import Controls from "./Controls/Controls";
import ScreenShareView from "./ScreenShareView/ScreenShareView";
import { updateDoc } from "firebase/firestore";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Features from "./Features/Features";
import FeatureButtons from "./FeatureButtons/FeatureButtons";
import { roomsColRef } from "../../../../../Firebase/config";
import "./RoomView.css";
import { query, orderBy } from "firebase/firestore";
import { useAuthContext } from "../../../../../Context/AuthContext";
const RoomView = ({ participants, meetingId }) => {
  const [room, setRoom] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const timelineSubColRef = collection(roomsColRef, `${meetingId}`, "timeline");
  const timelineQuery = query(timelineSubColRef, orderBy("time"));
  const participantsSubColRef = collection(
    roomsColRef,
    `${meetingId}`,
    "participants"
  );
  const { userDocRef } = useAuthContext();

  const updateIsRoomStarted = async (state) => {
    updateDoc(doc(roomsColRef, meetingId), {
      isRoomStarted: state,
    });
  };

  useEffect(() => {
    onSnapshot(doc(roomsColRef, meetingId), (snapshot) => {
      setRoom(snapshot.data());
    });
    onSnapshot(timelineQuery, (snapshot) => {
      setTimeline(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    onSnapshot(participantsSubColRef, (snapshot) => {
      setParticipantsList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);
  console.log(room);
  console.log(timeline);
  console.log(participantsList);

  return (
    <div className="RoomView">
      <div className="RoomViewHeader">
        <h1>{room?.roomName}</h1>
        {!room?.isRoomStarted && userDocRef.data().uid === room?.hostId && (
          <button
            className="ValidateParticipantsButton"
            onClick={() => updateIsRoomStarted(true)}>
            Bắt đầu buổi học!
          </button>
        )}
      </div>
      <div className="FunctionalSide">
        <div className="CameraSideContainer">
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
          <div className="ControlButtonsContainer">
            <Controls />
          </div>
        </div>

        <div className="FeatureSide">
          <Features
            participantsList={participantsList}
            participantsVideoSDK={participants}
            timeline={timeline}
            room={room}
          />
          <div className="ControlButtonsContainer --justifyContentRight">
            <FeatureButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomView;
