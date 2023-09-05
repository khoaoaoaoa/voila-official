import React from "react";
import NotFoundIMG from "../Assests/404NotFound.jpg";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Countdown from "react-countdown";

const NotFound = () => {
  const navigate = useNavigate();
  const countDown = useRef();

  const renderer = ({ seconds }) => {
    return <span>{seconds}</span>;
  };

  return (
    <>
      <div>
        ta da doi nguoi 3000 nam, chi nhung nguoi da dang nhap moi co the dung{" "}
      </div>
      <img src={NotFoundIMG} alt="" />
      <p>
        Redirect to Homepage in{" "}
        <span>
          <Countdown
            date={Date.now() + 3000}
            renderer={renderer}
            ref={countDown}
            onComplete={() => navigate("/")}
          />
        </span>
      </p>
    </>
  );
};

export default NotFound;
