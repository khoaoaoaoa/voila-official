import React from "react";
import { ReactComponent as Blob1 } from "../../Assests/blob1.svg";
import { ReactComponent as Blob2 } from "../../Assests/blob2.svg";
import { ReactComponent as Blob3 } from "../../Assests/blob3.svg";
import { useState } from "react";
import "./Feedback.css";
import ReactCanvasConfetti from "react-canvas-confetti";

const Feedback = () => {
  const [isJoinBtnClicked, setIsJoinBtnClicked] = useState(false);
  return (
    <div id="Feedback" className="FeedbackContainer">
      <ReactCanvasConfetti
        fire={isJoinBtnClicked}
        className={"Confetti"}
        onFire={() => {
          setIsJoinBtnClicked(false);
        }}
        angle={90}
        spread={260}
        particleCount={500}
      />
      <div className="BlobBackground">
        <Blob1 />
        <Blob2 />
        <Blob3 />
      </div>
      <div className="Feedback">
        <h1 className="FeedbackHeader"> Góp ý</h1>
        <div className="FeedbackBar">
          <div className="FeedbackInputContainer">
            <h3 className="FeedbackBarHeader">
              Cùng nhau, chúng ta tạo nên điều tuyệt vời. Hãy tham gia ngay!{" "}
            </h3>
            <div className="FeedbackInput">
              <input type="text" placeholder="Bạn có góp ý gì không?" />
              <button className="FeedbackSendInput" onClick={() => setIsJoinBtnClicked(true)}>
                <span>Gửi ngay!</span>
              </button>
            </div>
          </div>
          <button
            className="FeedbackSubmitBtn"
            onClick={() => setIsJoinBtnClicked(true)}>
            Tham gia thui!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
