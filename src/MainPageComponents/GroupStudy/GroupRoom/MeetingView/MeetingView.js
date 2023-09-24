import React from "react";
import "./MeetingView.css";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useState, useEffect } from "react";
import FormScreen from "../FormScreen/FormScreen";
import RoomView from "./RoomView/RoomView";
function MeetingView(props) {
  const [joined, setJoined] = useState("FORM");
  //   const [gridClassName, setGridClassName] = useState("");
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
    onPresenterChanged: () => {},
    onParticipantJoined: () => {},
    onParticipantLeft: () => {},
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };
  const joinWaitingScreen = () => {
    setJoined("WAIT");
  };

  const phaseDisplay = () => {
    if (joined && joined == "FORM") {
      return (
        <FormScreen
          meetingId={props.meetingId}
          joinWaitingScreen={joinWaitingScreen}
        />
      );
    } else if (joined && joined == "WAIT") {
      return (
        <div>
          <h3>Meeting Id: {props.meetingId}</h3>
          <button onClick={joinMeeting}>Join</button>
        </div>
      );
    } else if (joined && joined == "JOINING") {
      return <p>Joining</p>;
    } else if (joined && joined == "JOINED") {
      return <RoomView participants={participants} meetingId={props.meetingId}/>;
    }
  };
  return (
    <>
      {phaseDisplay()}
    </>
  );
}

export default MeetingView;
