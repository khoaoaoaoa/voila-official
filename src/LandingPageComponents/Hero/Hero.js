import React, { useState, useLayoutEffect } from "react";
import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import GlobeAndWorldMap from "./GlobeAndWorldMap/GlobeAndWorldMap.js";
import { Decorations } from "./Decorations/Decorations";
import Computer from "../../Assests/Hero/Computer.svg";
import Satellite from "../../Assests/Hero/Satellite.svg";
import Language from "../../Assests/Hero/Language.svg";
import Handshake from "../../Assests/Hero/Handshake.svg";
import ParticlesBackground from "./ParticlesBackground/ParticlesBackground";
const Hero = () => {
  return (
    <div className="Hero" id="Hero">
      {/* <Decorations/> */}
      <ParticlesBackground/>
      <div className="HeroGrid">
        <div className="HeroHeader">
          <h1>Voila! Học Tập Năng Suất</h1>
        </div>

        <div className="HeroText HeroLeftUp">
          <div className="HeroTextIMGAndH3">
            <h3>300B+ </h3>
            <img src={Computer} alt="" style={{ marginLeft: "0.75rem" }} />
          </div>
          <p>Số lượng từ mô hình AI được huấn luyện</p>
        </div>

        <div className="HeroGlobeContainer">
          <GlobeAndWorldMap />
        </div>

        <div className="HeroText HeroRightUp">
          <div className="HeroTextIMGAndH3" style={{justifyContent: "flex-end"}}>
            <img src={Satellite} alt="" />
            <h3>Hệ Thống Phương Pháp</h3>
          </div>
          <p>Giúp người học nắm vững kiến thức</p>
        </div>

        <div className="HeroText HeroLeftDown">
          <div className="HeroTextIMGAndH3">
            <h3>∞+</h3>
            <img src={Language} alt="" style={{ marginLeft: "0.75rem" }} />
          </div>
          <p>Nội dung bạn có thể luyện tập</p>{" "}
        </div>

        <div className="HeroText HeroRightDown">
          <div className="HeroTextIMGAndH3" style={{justifyContent: "flex-end"}}>
            <img src={Handshake} alt=""  />
            <h3>Học Tập Hợp Tác</h3>{" "}
          </div>

          <p>Sự kết hợp mới mẻ giữa học nhóm và thuyết trình</p>
        </div>

        <div className="HeroFooter">
          <div>
            <h2>Kết Nối Với Thế Giới</h2>{" "}
            <h3>
              Khai phá tiềm năng vô hạn trong bạn bằng cách học với Voila!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
