import React from "react";
import "./ParticipantsList.css";
import { useAuthContext } from "../../../../../../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ParticipantsList = ({ participantsList }) => {
  const { userDocRef } = useAuthContext();
  return (
    <>
      <div className="ParticipantsList">
        <h3
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          Participants List
        </h3>
        {participantsList.map((participant) => {
          return (
            <>
              <div className="participantContainer">
                <FontAwesomeIcon icon={faUser} />
                <p className="participantName">{participant.username}</p>
                {participant.uid === userDocRef.data().uid && (
                  <p
                    style={{
                      color: "black",
                      fontWeight: "bold",
                    }}>
                    ( You )
                  </p>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ParticipantsList;
