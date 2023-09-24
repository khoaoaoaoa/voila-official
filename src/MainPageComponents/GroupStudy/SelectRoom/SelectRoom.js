import React from "react";
import "./SelectRoom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const SelectRoom = (props) => {
  return (
    <>
      <div className="SelectRoom">
        <h1>Chọn loại phòng học</h1>
        <div className="SelectRoomButtons">
          <button
            onClick={() => props.setRoomType("GroupRoom")}
            style={{ marginRight: "2rem" }}>
            <FontAwesomeIcon icon={faPeopleGroup} />
            <p>Group Room</p>
          </button>
          <button onClick={() => props.setRoomType("PersonalRoom")}>
            <FontAwesomeIcon icon={faUser} />
            <p>Personal Room</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectRoom;
