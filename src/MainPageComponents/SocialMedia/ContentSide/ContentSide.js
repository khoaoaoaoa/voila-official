import React from "react";
import "./ContentSide.css";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Collaboration from "../../../Assests/Main/SocialMedia/collaboration.png";
import { AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";

const ContentSide = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="ContentSideContainer">
        <img
          src={Collaboration}
          className="ContentSideRoundedPanel"
          style={{
            marginTop: 0,
            padding: 0,
            height: "125px",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        <div className="ContentSideRoundedPanel ContentSidePortal">
          <div className="ContentSidePortalInputContainer">
            <img
              src="https://images.unsplash.com/photo-1692910410341-cf21779ebbe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
              alt=""
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <input
              type="text"
              placeholder="Bạn có câu hỏi gì?"
              onClick={() => navigate("new-post")}
            />
          </div>
          <div className="ContentSidePortalButtonsContainer">
            <button>
              <FontAwesomeIcon style={{ color: "red" }} icon={faMicrophone} />
              <span style={{ marginLeft: "5px" }}>Ghi âm</span>
            </button>
            <button>
              <FontAwesomeIcon style={{ color: "black" }} icon={faFile} />
              <span style={{ marginLeft: "5px" }}>Tài liệu</span>
            </button>
            <button>
              <FontAwesomeIcon style={{ color: "blue" }} icon={faFloppyDisk} />
              <span style={{ marginLeft: "5px" }}>Flashcards</span>
            </button>
          </div>
        </div>
        <AnimatePresence></AnimatePresence>
      </div>
    </>
  );
};

export default ContentSide;
