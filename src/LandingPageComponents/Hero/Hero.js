import React from "react";
import "./Hero.css";
import GlobeAndWorldMap from "./GlobeAndWorldMap/GlobeAndWorldMap.js";
import Computer from "../../Assests/Hero/Computer.svg";
import Satellite from "../../Assests/Hero/Satellite.svg";
import Gear from "../../Assests/Hero/Gear.svg";
import Collaboration from "../../Assests/Hero/Collaboration.svg";
import ParticlesBackground from "./ParticlesBackground/ParticlesBackground";
const Hero = () => {
  return (
    <div className="Hero" id="Hero">
      <ParticlesBackground />
      <div className="HeroGrid">
        <div className="HeroHeader">
          <h1>CoStudy - Học Tập Năng Suất</h1>
        </div>

        <div className="HeroText HeroLeftUp">
          <div className="HeroTextIMGAndH3">
            <h3>Đơn Giản Hóa</h3>
            <img src={Computer} alt="" style={{ marginLeft: "0.75rem" }} />
          </div>
          <p>Biến mọi khái niệm khó hiểu trở nên đơn giản</p>
        </div>

        <div className="HeroGlobeContainer">
          <GlobeAndWorldMap />
        </div>

        <div className="HeroText HeroRightUp">
          <div
            className="HeroTextIMGAndH3"
            style={{ justifyContent: "flex-end" }}>
            <img src={Satellite} alt="" />
            <h3>Hệ Thống Phương Pháp</h3>
          </div>
          <p>Kết hợp các tính năng học tập một cách logic</p>
        </div>

        <div className="HeroText HeroLeftDown">
          <div className="HeroTextIMGAndH3">
            <h3>Kỹ Thuật Feynman</h3>
            <img src={Gear} alt="" style={{ marginLeft: "0.75rem" }} />
          </div>
          <p>Giúp người học hiểu sâu và nắm chắc kiến thức</p>{" "}
        </div>

        <div className="HeroText HeroRightDown">
          <div
            className="HeroTextIMGAndH3"
            style={{ justifyContent: "flex-end" }}>
            <img
              src={Collaboration}
              alt=""
              style={{ marginRight: "0.75rem" }}
            />
            <h3>Học Tập Hợp Tác</h3>{" "}
          </div>

          <p>Sự kết hợp mới mẻ giữa học nhóm và thuyết trình</p>
        </div>

        <div className="HeroFooter">
          <div>
            <h2>Học Nhóm Với Thế Giới</h2>{" "}
            <h3>
              Khai phá tiềm năng vô hạn trong bạn bằng cách học với CoStudy
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
