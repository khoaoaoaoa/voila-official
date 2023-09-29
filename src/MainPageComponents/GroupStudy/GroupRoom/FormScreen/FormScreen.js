import React from "react";
import { useState, useEffect } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { roomsColRef } from "../../../../Firebase/config";
import "./FormScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { query, orderBy } from "firebase/firestore";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
const FormScreen = ({ meetingId, joinWaitingScreen }) => {
  const [timeline, setTimeline] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [inputStop, setInputStop] = useState({
    time: "",
    content: "",
  });
  const timelineSubColRef = collection(roomsColRef, meetingId, "timeline");
  const timelineQuery = query(timelineSubColRef, orderBy("time"));
  //Gui titile di
  const handleSubmit = async () => {
    try {
      await updateDoc(doc(roomsColRef, meetingId), {
        roomName: roomName,
      });
      joinWaitingScreen();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveStop = async (inputStop) => {
    try {
      await addDoc(timelineSubColRef, { ...inputStop });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteStop = async (id) => {
    try {
      await deleteDoc(doc(timelineSubColRef, id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    onSnapshot(timelineQuery, (snapshot) => {
      setTimeline(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <div className="FormScreen">
      <form onSubmit={(e) => e.preventDefault()} className="FormScreenForm">
        <div className="titleContainer">
          <h1>Title</h1>
          <input
            className="formScreenInput"
            type="text"
            name="roomName"
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </div>
        <div className="timelineContainer">
          <h1 style={{ marginBottom: "0.5rem" }}>Timeline</h1>
          <div className="timelineInputBar">
            <div className="timelineInputElement">
              <p>Mốc thời gian</p>
              <TimePicker
                format="HH:mm"
                value={inputStop.time}
                onChange={(value) => {
                  setInputStop({ ...inputStop, time: value });
                }}
              />
            </div>
            <div
              className="timelineInputElement"
              style={{ margin: "0 1rem", flex: 1 }}>
              <p>Nội dung</p>
              <input
                className="formScreenInput"
                type="text"
                onChange={(e) =>
                  setInputStop({ ...inputStop, content: e.target.value })
                }
              />
            </div>
            <button
              className="timelineSaveButton"
              onClick={() => handleSaveStop(inputStop)}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
          <div className="GridTimeline">
            <h2>Kịch bản</h2>
            {timeline.map((stop) => (
              <>
                <div className="StopContainer" key={stop.id}>
                  <TimePicker
                    format="HH:mm"
                    disabled
                    value={stop?.time}
                    onChange={(value) => {
                      setInputStop({ ...inputStop, time: value });
                    }}
                  />
                  <input
                    type="text"
                    style={{ margin: "0 1rem", flex: 1 }}
                    value={stop?.content}
                    disabled
                    className="formScreenInput"
                  />
                  <button
                    onClick={() => handleDeleteStop(stop.id)}
                    className="timelineSaveButton --deleteButton">
                    <FontAwesomeIcon icon={faEraser} />
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
        <button
          className="formScreenSubmitButton"
          onClick={() => handleSubmit()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormScreen;
