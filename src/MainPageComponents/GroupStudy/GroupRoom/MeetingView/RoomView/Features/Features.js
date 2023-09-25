import React from 'react'
import "./Features.css";
import ChatBox from "./ChatBox/ChatBox"
import ScriptBox from "./ScriptBox/ScriptBox";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
const Features = ({participantsList, participantsVideoSDK}) => {
  return (
    <>
      <div className="Features">
        <ParticipantsList participantsList={participantsList}/>
      </div>
    </>
  )
}

export default Features