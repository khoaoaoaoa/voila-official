import React from "react";
import "./Features.css";
import ChatBox from "./ChatBox/ChatBox";
import ScriptBox from "./ScriptBox/ScriptBox";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
const Features = ({
  participantsList,
  participantsVideoSDK,
  timeline,
  room,
  setTime,
  time,
  stopIndex,
  setStopIndex,
}) => {
  return (
    <>
      <div className="Features">
      
        {/* <ParticipantsList participantsList={participantsList}/> */}
        {timeline && (
          <ScriptBox
            timeline={timeline}
            participantsList={participantsList}
            room={room}
            setTime={setTime}
            time={time}
            stopIndex={stopIndex}
            setStopIndex={setStopIndex}
          />
        )}
      </div>
    </>
  );
};

export default Features;
