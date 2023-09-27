import React from 'react'
import "./Features.css";
import ChatBox from "./ChatBox/ChatBox"
import ScriptBox from "./ScriptBox/ScriptBox";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
const Features = ({participantsList, participantsVideoSDK, timeline, room}) => {
  return (
    <>
      <div className="Features">
        {/* <ParticipantsList participantsList={participantsList}/> */}
        <ScriptBox timeline={timeline} participantsList={participantsList} room={room} />
      </div>
    </>
  )
}

export default Features