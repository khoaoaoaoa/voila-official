import React from "react";
import "./SelectRoom.css";

import { useState } from "react";
import Basic from "./Basic/Basic";
import Functions from "./Functions/Functions";
import Decorations from "./Decorations/Decorations";
import SelectRoomPanel from "./SelectRoomPanel/SelectRoomPanel";
import { useEffect } from "react";
const SelectRoom = ({ formData, setFormData }) => {
  const [selectRoomData, setSelectRoomData] = useState({
    step: 1,
    RoomType: "",
    MediaDevices: {
      isMicOn: false,
      isCameraOn: false,
    },
    Mode: {
      isChildren: false,
      isCollaborative: false,
    },
    Decoration: {
      Theme: "",
      Tag: "",
    },
  });
  console.log("roomData",selectRoomData.step)
  useEffect(() => {
    if (selectRoomData.step === 4) {
      setFormData(...formData, ...selectRoomData);
    }
  }, [selectRoomData.step]);

  const PageDisplay = () => {
    if (selectRoomData.step == 1) {
      return (
        <SelectRoomPanel
          selectRoomData={selectRoomData}
          setSelectRoomData={setSelectRoomData}
        />
      );
    } else if (selectRoomData.step == 2) {
      return (
        <Basic
          selectRoomData={selectRoomData}
          setSelectRoomData={setSelectRoomData}
        />
      );
    } else if (selectRoomData.step == 3) {
      return (
        <Functions
          selectRoomData={selectRoomData}
          setSelectRoomData={setSelectRoomData}
        />
      );
    } else if (selectRoomData.step == 4) {
      return (
        <Decorations
          selectRoomData={selectRoomData}
          setSelectRoomData={setSelectRoomData}
        />
      );
    }
  };

  return (
    <>
      <div className="SelectRoomContainer">{PageDisplay()}</div>
    </>
  );
};

export default SelectRoom;
