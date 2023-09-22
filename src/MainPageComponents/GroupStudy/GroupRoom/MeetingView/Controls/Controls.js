import React from 'react'
import "./Controls.css";
import { useMeeting } from '@videosdk.live/react-sdk';
function Controls() {
    const { leave, toggleMic, toggleWebcam, toggleScreenShare } = useMeeting();
    return (
      <div>
        <button onClick={() => leave()}>Leave</button>
        <button onClick={() => toggleMic()}>toggleMic</button>
        <button onClick={() => toggleWebcam()}>toggleWebcam</button>
        <button onClick={() => toggleScreenShare()}>toggleScreenShare</button>
      </div>
    );
  }
export default Controls