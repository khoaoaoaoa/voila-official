import React from 'react'
import "./Features.css";
import ChatBox from "./ChatBox/ChatBox"
import ScriptBox from "./ScriptBox/ScriptBox";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
const Features = () => {
  return (
    <>
      <div className="Features">
        <ParticipantsList/>
      </div>
    </>
  )
}

export default Features