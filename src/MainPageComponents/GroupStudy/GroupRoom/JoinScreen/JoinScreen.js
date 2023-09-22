import React from 'react'
import { useState } from 'react';
import "./JoinScreen.css";
function JoinScreen({ getMeetingAndToken }) {
    const [meetingId, setMeetingId] = useState(null);
    return (
      <div>
        <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <button onClick={ async () =>   await getMeetingAndToken(meetingId) }>Join</button>
        {" or "}
        <button onClick={  async () =>   await getMeetingAndToken(null)}>Create Meeting</button>
      </div>
    );
  }
export default JoinScreen;