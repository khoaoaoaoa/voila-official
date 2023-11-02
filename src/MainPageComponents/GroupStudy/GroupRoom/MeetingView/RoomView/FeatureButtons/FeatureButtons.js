import React from "react";
import "./FeatureButtons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faScroll,
  faBookOpenReader,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
const FeatureButtons = ({setFeatureSelection}) => {
  
  return (
    <>
      <div className="FeatureButtons">
        <button onClick={()=>{setFeatureSelection("ChatBox")}}>
          <FontAwesomeIcon icon={faComments} />
        </button>
        <button onClick={()=>{setFeatureSelection("ScriptBox")}}>
          <FontAwesomeIcon icon={faScroll} />
        </button>
        <button onClick={()=>{setFeatureSelection("ParticipantsList")}}>
          <FontAwesomeIcon icon={faAddressBook} />
        </button>
      </div>
    </>
  );
};

export default FeatureButtons;
