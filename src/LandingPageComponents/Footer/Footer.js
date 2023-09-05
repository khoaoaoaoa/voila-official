import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
const Footer = () => {
  return (
    <div style={{ backgroundColor: "#EBEBF8" }}>
      <div className="Footer">
        <div className="LinkContainer">
          <div className="ProductOutro">
            <h3>Voila!</h3>

            <p className="ProductOutroDescription">
              Nền tảng học tập trực tuyến năng động, ứng dụng công nghệ để đem
              lại hiệu quả tối ưu
            </p>
            <p>Made by Khoaaa</p>
          </div>
          <div className="Contacts">
            <h3>Liên hệ</h3>
            <div className="ContactsInfoDescription">
              <p>Mr. Đỗ Trọng Khoa</p>
              <p>Trường THPT Trần Phú, TPHCM</p>
            </div>
            <div className="ContactLinks">
              <a href="https://www.facebook.com/khoaoaoa/">
                <span>
                  <FontAwesomeIcon
                    className="ContactLinksIcon"
                    icon={faFacebook}
                  />{" "}
                </span>
              </a>
              <a href="https://www.instagram.com/dalchemistt">
                <span>
                  <FontAwesomeIcon
                    className="ContactLinksIcon"
                    icon={faInstagram}
                  />{" "}
                </span>
              </a>
              <a href="https://github.com/khoaoaoaoa">
                <span>
                  <FontAwesomeIcon
                    className="ContactLinksIcon"
                    icon={faGithub}
                  />{" "}
                </span>
              </a>
              <a href="https://www.linkedin.com/in/khoaoaoaoa">
                <span>
                  <FontAwesomeIcon
                    className="ContactLinksIcon"
                    icon={faLinkedin}
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
