import React from "react";
import "./MeetingView.css";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useState, useEffect } from "react";
import FormScreen from "../FormScreen/FormScreen";
import { setDoc, deleteDoc } from "firebase/firestore";
import { roomsColRef } from "../../../../Firebase/config";
import RoomView from "./RoomView/RoomView";
import { useAuthContext } from "../../../../Context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
function MeetingView() {
  const [joined, setJoined] = useState("");
  const { userDocRef } = useAuthContext();
  const { meetingId, onMeetingLeave } = useOutletContext();
  const roomDocRef = doc(roomsColRef, meetingId);
  const [room, setRoom] = useState(null);
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
  const getRoomDocRefData = async () => {
    const docData = await getDoc(roomDocRef);
    setRoom(docData.data());
  };
  useEffect(() => {
    getRoomDocRefData();
  }, []);
  useEffect(() => {
    if (userDocRef?.data()?.uid === room?.hostId) {
      setJoined("FORM");
    } else {
      joinWaitingScreen();
    }
  }, [room]);

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
