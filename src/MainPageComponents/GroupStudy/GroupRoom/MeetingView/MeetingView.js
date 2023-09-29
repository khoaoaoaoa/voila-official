import React from "react";
import "./MeetingView.css";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useState, useEffect } from "react";
import FormScreen from "../FormScreen/FormScreen";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { roomsColRef } from "../../../../Firebase/config";
import RoomView from "./RoomView/RoomView";
import { useAuthContext } from "../../../../Context/AuthContext";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
function MeetingView() {
  const [joined, setJoined] = useState("");
  const { meetingId: meetingParamsId } = useParams();
  const [participantsList, setParticipantsList] = useState([]);
  const { userDocRef } = useAuthContext();
  const { meetingId, onMeetingLeave, isHost } = useOutletContext();
  console.log(meetingId);
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: async () => {
      setJoined("JOINED");
      await setDoc(
        doc(roomsColRef, meetingId, "participants", userDocRef.data().uid),
        { uid: userDocRef.data().uid, username: userDocRef.data().username }
      );
    },
    //callback for when meeting is left
    onMeetingLeft: async () => {
      onMeetingLeave();
      await deleteDoc(
        doc(roomsColRef, meetingId, "participants", userDocRef.data().uid)
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
  useEffect(() => {
    if (isHost) {
      setJoined("FORM");
    } else {
      joinWaitingScreen();
    }
  }, []);

  const phaseDisplay = () => {
    if (joined && joined == "FORM") {
      return (
        <FormScreen
          meetingId={meetingId}
          joinWaitingScreen={joinWaitingScreen}
        />
      );
    } else if (joined && joined == "WAIT") {
      return (
        <div>
          <h3>Meeting Id: {meetingId}</h3>
          <button onClick={joinMeeting}>Join</button>
        </div>
      );
    } else if (joined && joined == "JOINING") {
      return <p>Joining</p>;
    } else if (joined && joined == "JOINED") {
      return <RoomView participants={participants} meetingId={meetingId} />;
    }
  };
  return <>{phaseDisplay()}</>;
}

export default MeetingView;
