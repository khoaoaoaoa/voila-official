import React from "react";
import "./ParticipantsList";
const ParticipantsList = (props) => {

  return (
    <>
      <div className="ParticipantsList">
        {props?.participants?.map(participant => {

        })}
      </div>
    </>
  );
};

export default ParticipantsList;
