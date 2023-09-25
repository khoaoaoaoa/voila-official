import React from "react";
import "./GroupRoom.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../../../VideoSDK/API";
import { useAuthContext } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import JoinScreen from "./JoinScreen/JoinScreen";
import { useNavigate } from "react-router-dom";
import { roomsColRef } from "../../../Firebase/config";
import { Outlet } from "react-router-dom";
function GroupRoom() {
  const [meetingId, setMeetingId] = useState(null);
  const navigate = useNavigate();
  const { userDocRef } = useAuthContext();
  const [waitForRoom, setWaitForRoom] = useState(true);
  const [isHost, setIsHost] = useState(false);
  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
    navigate(meetingId);
    return meetingId;
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
 
  };
  const handleCreateRoomFirebase = async (id) => {
    try {
      await setDoc(doc(roomsColRef, id), {
        roomId: id,
        hostId: userDocRef?.data()?.uid,
      });

      toast.success("Đăng ký thành công!");
      setIsHost(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return authToken && meetingId && !waitForRoom ? (
    <>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: userDocRef?.data()?.username,
        }}
        token={authToken}>
        <Outlet
          context={{ meetingId: meetingId, onMeetingLeave: onMeetingLeave, isHost: isHost}}
        />
      </MeetingProvider>
    </>
  ) : (
    <JoinScreen
      getMeetingAndToken={getMeetingAndToken}
      handleCreateRoomFirebase={handleCreateRoomFirebase}
      setWaitForRoom={setWaitForRoom}
    />
  );
}

export default GroupRoom;
