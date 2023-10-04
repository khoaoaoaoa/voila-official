import React, { useEffect, useRef, useState } from "react";
import ParticipantView from "./ParticipantView/ParticipantView";
import Controls from "./Controls/Controls";
import ScreenShareView from "./ScreenShareView/ScreenShareView";
import { updateDoc } from "firebase/firestore";
import { onSnapshot, collection, doc } from "firebase/firestore";
import PortalContainer from "../../../../../Components/PortalContainer/PortalContainer";
import PromptPortal from "./Features/ScriptBox/PromptPortal/PromptPortal";
import FeatureButtons from "./FeatureButtons/FeatureButtons";
import { roomsColRef } from "../../../../../Firebase/config";
import "./RoomView.css";
import { query, orderBy } from "firebase/firestore";
import { useAuthContext } from "../../../../../Context/AuthContext";
import ScriptBox from "./Features/ScriptBox/ScriptBox";
import { toast } from "react-toastify";
const RoomView = ({ participants, meetingId }) => {
  const [timeStop, setTimeStop] = useState(0);
  const [isPromptPortalOpen, setIsPromptPortalOpen] = useState(false);
  const [room, setRoom] = useState(null);
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [stopIndex, setStopIndex] = useState(0);
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
    await updateDoc(doc(roomsColRef, meetingId), {
      isRoomStarted: state,
      startedTime: new Date().toString(),
    });
  };

  // ---time logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (!room?.startedTime) return;
      const time = Date.now() - Date.parse(room?.startedTime);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const seconds = Math.floor((time / 1000) % 60);

      if (hours < 10) {
        setTime((prev) => ({ ...prev, hours: `0${hours}` }));
      } else {
        setTime((prev) => ({ ...prev, hours: `${hours}` }));
      }
      if (minutes < 10) {
        setTime((prev) => ({ ...prev, minutes: `0${minutes}` }));
      } else {
        setTime((prev) => ({ ...prev, minutes: `${minutes}` }));
      }
      if (seconds < 10) {
        setTime((prev) => ({ ...prev, seconds: `0${seconds}` }));
      } else {
        setTime((prev) => ({ ...prev, seconds: `${seconds}` }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [room?.startedTime]);

  useEffect(() => {
    const miliseconds = time.minutes * 60 * 1000 + time.seconds * 1000;

    if (
      miliseconds > timeStop &&
      timeStop != 0 &&
      stopIndex + 1 <= timeline.length - 1
    ) {
      const nextIndex = stopIndex + 1;
      setStopIndex(nextIndex);
      if (nextIndex + 1 <= timeline.length - 1) {
        const hours = timeline[nextIndex + 1].time.substring(0, 2);
        const minutes = timeline[nextIndex + 1].time.substring(3, 5);
        setTimeStop(hours * 60 * 60 * 1000 + minutes * 60 * 1000);
      }
      setIsPromptPortalOpen(true);
      toast(
        `🚀 ${timeline[nextIndex].time} - ${timeline[nextIndex].content} - ${timeline[nextIndex].teacherName}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      console.log("nextIndex: " + nextIndex);
    } else if (miliseconds > timeStop && timeStop === 0) {
      setStopIndex(0);
      const hours = timeline[1].time.substring(0, 2);
      const minutes = timeline[1].time.substring(3, 5);
      setTimeStop(hours * 60 * 60 * 1000 + minutes * 60 * 1000);
    }
    console.log(stopIndex);
    console.log(miliseconds);
    console.log(timeStop);
  }, [time]);

  //---time logic ---

  useEffect(() => {
    onSnapshot(doc(roomsColRef, meetingId), (snapshot) => {
      setRoom(snapshot.data());
      console.log(snapshot.data());
      console.log(room);
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

  // console.log(timeline);
  // console.log(participantsList);
  console.log(time);
  return (
    <>
      {room && timeline && participantsList && (
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
            {room?.isRoomStarted && (
              <div className="timerContainer">
                <p>
                  {time.hours} : {time.minutes}
                </p>
              </div>
            )}
          </div>
          <div className="FunctionalSide">
            <div className="CameraSideContainer">
              <div className="CameraGrid">
                {[...participants.keys()].map((participantId) => (
                  <>
                    <ScreenShareView
                      stopIndex={stopIndex}
                      participantId={participantId}
                      key={participantId}
                    />
                  </>
                ))}
                {[...participants.keys()].map((participantId) => (
                  <>
                    <ParticipantView
                      participantsList={participantsList}
                      timeline={timeline}
                      stopIndex={stopIndex}
                      participantId={participantId}
                      key={participantId}
                      isRoomStarted={room?.isRoomStarted}
                    />
                  </>
                ))}
              </div>
              <div className="ControlButtonsContainer">
                <Controls />
              </div>
            </div>

            <div className="FeatureSide">
              {isPromptPortalOpen &&
                timeline[stopIndex].teacherId === userDocRef.data().uid && (
                  <PortalContainer
                    className="PromptPortalContainer"
                    onClose={() => setIsPromptPortalOpen(false)}>
                    <PromptPortal teacherInfo={timeline[stopIndex]} />
                  </PortalContainer>
                )}
              {timeline && (
                <ScriptBox
                  timeline={timeline}
                  participantsList={participantsList}
                  room={room}
                  stopIndex={stopIndex}
                />
              )}
              <div className="ControlButtonsContainer --justifyContentRight">
                <FeatureButtons />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomView;
