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
import ParticipantsList from "./Features/ParticipantsList/ParticipantsList";
import ScriptBox from "./Features/ScriptBox/ScriptBox";
import ChatBox from "./Features/ChatBox/ChatBox";
import { toast } from "react-toastify";
const RoomView = ({ participants, meetingId }) => {
  const [timeStop, setTimeStop] = useState(0);
  const [isPromptPortalOpen, setIsPromptPortalOpen] = useState(false);
  const [startedTime, setStartedTime] = useState(null);
  const [room, setRoom] = useState(null);
  const [roomStatus, setRoomStatus] = useState("inactive");
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [stopIndex, setStopIndex] = useState(0);
  const [sessionTime, setSessionTime] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [featureSelection, setFeatureSelection] = useState("ScriptBox");
  const timelineSubColRef = collection(roomsColRef, `${meetingId}`, "timeline");
  const timelineQuery = query(timelineSubColRef, orderBy("time"));
  const participantsSubColRef = collection(
    roomsColRef,
    `${meetingId}`,
    "participants"
  );
  const messagesSubColRef = collection(roomsColRef, `${meetingId}`, "messages");
  const { userDocRef } = useAuthContext();

  const updateRoomStatus = async (data) => {
    await updateDoc(doc(roomsColRef, meetingId), data);
  };
  useEffect(() => {
    updateRoomStatus({ roomStatus: roomStatus, startedTime: startedTime });
  }, [roomStatus, startedTime]);

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
    onSnapshot(messagesSubColRef, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  // ---time logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        room?.roomStatus === "session-prepare" ||
        room?.roomStatus === "inactive"
      )
        return;
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
  }, [room?.roomStatus]);

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
      setRoomStatus("session-prepare");
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
    console.log(time);
    console.log(stopIndex);
    console.log(miliseconds);
    console.log(timeStop);
    console.log("Status:" + room?.roomStatus);
  }, [time]);

  //---time logic ---
  // --session-prepare-time-logic
  useEffect(() => {
    const date = Date.now();
    const interval = setInterval(() => {
      if (room?.roomStatus !== "session-prepare") return;
      //time format is ms
      const time = Date.now() - date;
      setSessionTime(time);
    }, 1000);
    if (room?.roomStatus === "active") {
      clearInterval(interval);
    }
  }, [room?.roomStatus]);
  // --session-prepare-time-logic
  console.log(startedTime);
  // console.log(timeline);
  // console.log(participantsList);

  //---FeatureSelection
  const featureSelect = () => {
    if (featureSelection === "ChatBox") {
      return <ChatBox meetingId={meetingId} messages={messages} />;
    } else if (featureSelection === "ScriptBox" && timeline) {
      return (
        <ScriptBox
          timeline={timeline}
          participantsList={participantsList}
          room={room}
          stopIndex={stopIndex}
        />
      );
    } else if (featureSelection === "ParticipantsList" && participantsList) {
      return <ParticipantsList participantsList={participantsList} />;
    }
  };
  //---FeatureSelection
  return (
    <>
      {room?.roomStatus && timeline && participantsList && (
        <div className="RoomView">
          <div className="RoomViewHeader">
            <h1>{room?.roomName}</h1>
            <div className="RoomViewHeaderButtons">
              {room?.roomStatus === "inactive" &&
                userDocRef.data().uid === room?.hostId && (
                  <button
                    className="ValidateParticipantsButton"
                    onClick={() => {
                      setRoomStatus("active");
                      setStartedTime(new Date().toString());
                    }}>
                    Bắt đầu buổi học!
                  </button>
                )}
              {room?.roomStatus === "session-prepare" &&
                timeline[stopIndex]?.teacherId === userDocRef.data().uid && (
                  <button
                    className="sessionButton"
                    onClick={() => {
                      setRoomStatus("active");
                      setStartedTime(
                        new Date(
                          Date.parse(room?.startedTime) + sessionTime
                        ).toString()
                      );
                    }}>
                    Clickhere
                  </button>
                )}
              {(room?.roomStatus === "active" ||
                room?.roomStatus === "session-prepare") && (
                <div className="timerContainer">
                  <p>
                    {time.hours} : {time.minutes}
                  </p>
                </div>
              )}
            </div>
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
                      room={room}
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
              <div className="FeatureContainer">{featureSelect()}</div>
              <div className="ControlButtonsContainer --justifyContentRight">
                <FeatureButtons setFeatureSelection={setFeatureSelection} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomView;
