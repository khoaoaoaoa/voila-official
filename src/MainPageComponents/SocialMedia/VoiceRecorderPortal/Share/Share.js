import React from "react";
import "./Share.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";


function Share({ formData, setFormData }) {

  useEffect(() => {
    console.log(formData);
  }, []);
  return (
    <>
      <div className="Share">
        <div className="ShareContainer">
          <h2>Lưu về máy</h2>
          <audio src={formData?.MediaBlobURL} controls style={{margin: "0.75rem 0", width: "100%"}}></audio>
        </div>
        <div className="ShareContainer --shareContainer">
          <h2>Chia sẻ</h2>
          <button className="ShareVoilaButton">
            <FontAwesomeIcon icon={faShare} />
            <span style={{ marginLeft: "4px" }}>
              Chia sẻ cho cộng đồng Voila!
            </span>
          </button>
          <div className="ShareMedia">
            <button
              className="MediaButton"
              style={{ backgroundColor: "#1773EA", color: "white" }}>
              <FontAwesomeIcon icon={faFacebook} />
              <span style={{ marginLeft: "4px" }}>Facebook</span>
            </button>
            <button
              className="MediaButton"
              style={{ backgroundColor: "#1C96E8", color: "white" }}>
              <FontAwesomeIcon icon={faTwitter} />
              <span style={{ marginLeft: "4px" }}>Twitter</span>
            </button>
            <button className="MediaButton --instagram">
              <FontAwesomeIcon icon={faInstagram} />
              <span style={{ marginLeft: "4px" }}>Instagram</span>
            </button>
            <button
              className="MediaButton"
              style={{ backgroundColor: "#DD4B39", color: "white" }}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span style={{ marginLeft: "4px" }}>Email</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Share;
