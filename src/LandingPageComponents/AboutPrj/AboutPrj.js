import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import "./AboutPrj.css";
import Lottie from "lottie-react";
import studyLottieAnimation from "../../Assests/studyLottieAnimation.json";
const AboutPrj = () => {
  return (
    <div className="AboutPrjContainer" id="AboutPrj">
      <div className="AboutPrj">
        <h1 className="AboutPrjHeader">Về Dự Án</h1>
        <div className="AboutPrjContentContainer">
          <div className="AboutPrjText">
            <h1>
              {" "}
              <FontAwesomeIcon icon={faGreaterThan} className="faGreaterThan" />
              {"\u00A0"}
              <CountUp
                start={0}
                end={18000000}
                enableScrollSpy
                scrollSpyOnce
                duration={6}>
                {({ countUpRef }) => <span ref={countUpRef} />}
              </CountUp>
            </h1>
            <p>
              học sinh, sinh viên Việt Nam đang học trên các nền tảng giáo dục
              trực tuyến mỗi ngày. Và với mong muốn lan tỏa lợi ích giáo dục{" "}
            </p>
            <h3>Nền tảng CoStudy ra đời!</h3>
          </div>
          <Tilt tiltEnable>
            <Lottie
              animationData={studyLottieAnimation}
              loop={true}
              className="AboutPrjIMG"
            />
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default AboutPrj;
