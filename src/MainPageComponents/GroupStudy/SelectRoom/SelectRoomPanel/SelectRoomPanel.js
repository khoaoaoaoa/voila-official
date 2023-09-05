import React from "react";
import "./SelectRoomPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
const SelectRoomPanel = ({ selectRoomData, setSelectRoomData }) => {
  const handleClick = (type) => {
    setSelectRoomData({
      ...selectRoomData,
      RoomType: type,
      step: selectRoomData.step + 1,
    });
  };
  return (
    <div className="SelectRoomPanel">
      <div className="SelectRoomHeader">
        <h2>Chọn phòng học</h2>
      </div>
      <div>
        <div className="SelectRoomOptionsContainer">
          <div className="RoomOptionContainer">
            <button
              className="RoomOption"
              onClick={() => handleClick("personal")}>
              <FontAwesomeIcon icon={faUser} />
            </button>
            <p>Phòng cá nhân</p>
          </div>
          <div className="RoomOptionContainer">
            <button className="RoomOption" onClick={() => handleClick("group")}>
              <FontAwesomeIcon icon={faPeopleGroup} />
            </button>
            <p>Phòng học nhóm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRoomPanel;
