import React from "react";
import { useState, useEffect } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { roomsColRef } from "../../../../Firebase/config";
import "./FormScreen.css";
import { toast } from "react-toastify";
const FormScreen = (props) => {
  const [timeline, setTimeline] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [inputStop, setInputStop] = useState({
    time: "",
    content: "",
  });
  const timelineSubColRef = collection(
    roomsColRef,
    `${props.meetingId}`,
    "timeline"
  );
  //Gui titile di
  const handleSubmit = async () => {
    try {
      await updateDoc(doc(roomsColRef, props.meetingId), {
        roomName: roomName,
      });
      props.joinWaitingScreen();
    } catch (err) {
      toast.error(err.message);
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
    onSnapshot(timelineSubColRef, (snapshot) => {
      setTimeline(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <div className="FormScreen">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="titleContainer">
          <h1>Title</h1>
          <input
            required
            type="text"
            name="roomName"
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
        </div>
        <div className="timelineContainer">
          <h1>Timeline</h1>
          <div className="timelineInputBar">
            <input
              type="time"
              onChange={(e) =>
                setInputStop({ ...inputStop, time: e.target.value })
              }
            />
            <input
              type="text"
              onChange={(e) =>
                setInputStop({ ...inputStop, content: e.target.value })
              }
            />
            <button onClick={() => handleSaveStop(inputStop)}>Save</button>
          </div>
          <div className="GridTimeline">
            {timeline.map((stop) => (
              <>
                <div className="StopContainer">
                  <input type="time" value={stop?.time} disabled />
                  <input type="text" value={stop?.content} disabled />
                  <button onClick={() => handleDeleteStop(stop.id)}>
                    delete
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
        <button onClick={() => handleSubmit()}>Submit</button>
      </form>
    </div>
  );
};

export default FormScreen;
