import React from "react";
import "./ChatBox.css";
import { useState } from "react";
import { roomsColRef } from "../../../../../../../Firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "../../../../../../../Context/AuthContext";
const ChatBox = ({ meetingId, messages }) => {
  const { userDocRef } = useAuthContext();
  // State to store the user typed message
  const [message, setMessage] = useState("");
  const messagesSubColRef = collection(roomsColRef, `${meetingId}`, "messages");
  const handleSaveMessageFirebase = async () => {
    await addDoc(messagesSubColRef, {
      messageSenderId: userDocRef.data().uid,
      messageSenderName: userDocRef.data().username,
      messageContent: message,
    });
    setMessage("");
  };

  return (
    <>
      <div className="ChatBoxBackground">
        <h3
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            fontWeight: "bold"
          }}>
          ChatBox
        </h3>
        <div className="MessageBoxContainer">
          {messages.map((message) => {
            return (
              <div className="MessageContainer" key={message.id}>
                <p style={{ fontWeight: "bold" }}>
                  {message.messageSenderName}
                </p>
                <p className="MessageContent"> {message.messageContent}</p>
              </div>
            );
          })}
        </div>
        <div className="InputMessageContainer">
          <input
            value={message}
            placeholder="Aa"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={handleSaveMessageFirebase}>
            {" "}
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
