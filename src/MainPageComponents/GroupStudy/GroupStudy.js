import React from "react";
import { useState, useEffect } from "react";
import SelectRoom from "./SelectRoom/SelectRoom";
import GroupRoom from "./GroupRoom/GroupRoom";
import PersonalRoom from "./PersonalRoom/PersonalRoom";
const GroupStudy = () => {
  const FormSubHeader = [
    "Nói năng lưu loát mới có được thiên hạ",
    "Chia sẻ bản ghi âm hoặc lưu vào kho lưu trữ",
  ];
  const [formData, setFormData] = useState({
    step: 1,
    RoomType: null,
    MediaBlobURL: "",
    Share: "",
  });
  console.log("formData",formData.step)
  const PageDisplay = () => {
    switch (formData.step) {
      case 1:
        return <SelectRoom formData={formData} setFormData={setFormData} />;

      case 2:
        return <GroupRoom formData={formData} setFormData={setFormData} />;

      default:
        return new Error(`Invalid step ${formData.step}`);
    }
  };
  return (
    <>
      <div className="GroupStudyBackground">
       <GroupRoom/>
      </div>
    </>
  );
};

export default GroupStudy;
