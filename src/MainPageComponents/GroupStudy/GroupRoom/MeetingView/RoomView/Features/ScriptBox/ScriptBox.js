import React, { useEffect, useState } from "react";
import "./ScriptBox.css";
import { updateDoc } from "firebase/firestore";
import { roomsColRef } from "../../../../../../../Firebase/config";
import { useAuthContext } from "../../../../../../../Context/AuthContext";
// import "react-step-progress-bar/styles.css";
// import { ProgressBar, Step } from "react-step-progress-bar";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { doc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const ScriptBox = ({
  timeline,
  participantsList,
  room,
  setTime,
  time,
  stopIndex,
  setStopIndex,
}) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [timeStop, setTimeStop] = useState(0);
  let { meetingId } = useParams();
  const { userDocRef } = useAuthContext();
  useEffect(() => {
    const miliseconds = time.minutes * 60 * 1000 + time.seconds * 1000;

    if (
      miliseconds > timeStop &&
      timeStop != 0 &&
      stopIndex + 1 <= timeline.length - 1
    ) {
      const nextIndex = stopIndex + 1;
      setStopIndex(nextIndex);
      if (nextIndex + 1 <= timeline.length - 1) {
        const hours = timeline[nextIndex + 1].time.substring(0, 2);
        const minutes = timeline[nextIndex + 1].time.substring(3, 5);
        setTimeStop(hours * 60 * 60 * 1000 + minutes * 60 * 1000);
      }
      console.log("nextIndex: " + nextIndex);
    } else if (miliseconds > timeStop && timeStop === 0) {
      setStopIndex(0);
      const hours = timeline[1].time.substring(0, 2);
      const minutes = timeline[1].time.substring(3, 5);
      setTimeStop(hours * 60 * 60 * 1000 + minutes * 60 * 1000);
    }
    console.log(stopIndex);
    console.log(miliseconds);
    console.log(timeStop);
  }, [time]);
  useEffect(() => {
    const options = [];
    participantsList.forEach((participant) => {
      options.push({
        value: { username: participant.username, uid: participant.uid },
        label: participant.username,
      });
    });
    setSelectOptions([...options]);
  }, [participantsList]);
  //--time logic--

  useEffect(() => {
    const interval = setInterval(() => {
      if (!room.startedTime) return;
      const time = Date.now() - Date.parse(room?.startedTime);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const seconds = Math.floor((time / 1000) % 60);

      if (hours < 10) {
        setTime((prev) => ({ ...prev, hours: `0${hours}` }));
      } else {
        setTime((prev) => ({ ...prev, hours: `${hours}` }));
      }
      if (minutes < 10) {
        setTime((prev) => ({ ...prev, minutes: `0${minutes}` }));
      } else {
        setTime((prev) => ({ ...prev, minutes: `${minutes}` }));
      }
      if (seconds < 10) {
        setTime((prev) => ({ ...prev, seconds: `0${seconds}` }));
      } else {
        setTime((prev) => ({ ...prev, seconds: `${seconds}` }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [room?.startedTime]);
  //--time logic--

  const updateRoleTeacher = async (data) => {
    const stopRef = doc(roomsColRef, meetingId, "timeline", data.id);
    const participantRef = doc(
      roomsColRef,
      meetingId,
      "participants",
      data.value.uid
    );
    try {
      await updateDoc(stopRef, {
        teacherId: data.value.uid,
        teacherName: data.label,
      });
      await updateDoc(participantRef, { role: "teacher" });
    } catch (err) {
      toast.err(err.message);
    }
  };
  const updateRoleTimer = async (data) => {
    const participantRef = doc(
      roomsColRef,
      meetingId,
      "participants",
      data.value.uid
    );
    try {
      await updateDoc(participantRef, { role: "timer" });
    } catch (err) {
      toast.err(err.message);
    }
  };
  return (
    <>
      <div className="DisplayTimeline">
        {userDocRef.data().uid === room?.hostId && !room?.isRoomStarted && (
          <>
            <div className="DisplayTimelineHeader">
              <h2>Luân phiên vai trò</h2>
            </div>
            <div className="DisplayStopContainer">
              <h3>Timer</h3>
              <Select
                className="timelineSelect"
                defaultValue={null}
                onChange={(newValue) => updateRoleTimer({ ...newValue })}
                options={selectOptions}
              />
            </div>
            <div className="DisplayTimelineHeader">
              <h3>Chọn vai trò "giáo viên"</h3>
            </div>
            {timeline.map((stop) => (
              <>
                <div className="DisplayStopContainer" key={stop.id}>
                  <p className="timelineData">
                    {stop?.time} - {stop.content}
                  </p>
                  <Select
                    className="timelineSelect"
                    defaultValue={null}
                    onChange={(newValue) =>
                      updateRoleTeacher({ ...newValue, id: stop.id })
                    }
                    options={selectOptions}
                  />
                </div>
              </>
            ))}
          </>
        )}
        {room?.isRoomStarted && (
          <>
            <div className="DisplayTimelineHeader">
              <h2>Kế hoạch</h2>
            </div>
            <div className="DisplayParticipantTimeline">
              {timeline.map((stop) => (
                <>
                  <div className="DisplayParticipantStop" key={stop.id}>
                    <p
                      className={
                        timeline[stopIndex]?.id == stop?.id
                          ? "timelineData --thisStop"
                          : "timelineData"
                      }>
                      {stop?.time} - {stop?.content} - {stop?.teacherName}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ScriptBox;
