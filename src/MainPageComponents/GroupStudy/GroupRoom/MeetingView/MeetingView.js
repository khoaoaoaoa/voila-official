import React from "react";
import "./MeetingView.css";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useState, useEffect } from "react";
import FormScreen from "../FormScreen/FormScreen";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { roomsColRef } from "../../../../Firebase/config";
import RoomView from "./RoomView/RoomView";
import { useAuthContext } from "../../../../Context/AuthContext";
function MeetingView(props) {
  const [joined, setJoined] = useState("FORM");
  const [participantsList, setParticipantsList] = useState([]);
  const { userDocRef } = useAuthContext();

  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: async () => {
      setJoined("JOINED");
      await setDoc(
        doc(
          roomsColRef,
          props.meetingId,
          "participants",
          userDocRef.data().uid
        ),
        { uid: userDocRef.data().uid, username: userDocRef.data().username }
      );
    },
    //callback for when meeting is left
    onMeetingLeft: async () => {
      props.onMeetingLeave();
      await deleteDoc(
        doc(roomsColRef, props.meetingId, "participants", userDocRef.data().uid)
      );
    },
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
      return (
        <RoomView participants={participants} meetingId={props.meetingId} />
      );
    }
  };
  return <>{phaseDisplay()}</>;
}

export default MeetingView;
