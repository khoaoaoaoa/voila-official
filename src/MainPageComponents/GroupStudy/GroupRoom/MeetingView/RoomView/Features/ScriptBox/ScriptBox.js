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

const ScriptBox = ({ timeline, participantsList, room, stopIndex }) => {
  const [selectOptions, setSelectOptions] = useState([]);
  let { meetingId } = useParams();
  const { userDocRef } = useAuthContext();

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
      <div className="FeatureBackground">
        {userDocRef.data().uid === room?.hostId &&
          room?.roomStatus === "inactive" && (
            <>
              <div className="DisplayTimelineHeader">
                <h3>Luân phiên vai trò</h3>
              </div>
              <div className="DisplayStopContainer">
                <h4>Timer</h4>
                <Select
                  className="timelineSelect"
                  defaultValue={null}
                  onChange={(newValue) => updateRoleTimer({ ...newValue })}
                  options={selectOptions}
                />
              </div>
              <div className="DisplayTimelineHeader">
                <h4>Chọn vai trò "giáo viên"</h4>
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

        {((room?.roomStatus === "active") ||
          (room?.roomStatus === "session-prepare")) && (
          <>
            <div className="DisplayTimelineHeader">
              <h3>Kế hoạch</h3>
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
