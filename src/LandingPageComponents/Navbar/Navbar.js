import React from "react";
import "./Navbar.css";
import * as Scroll from "react-scroll";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import SignIn from "../Components/SignIn/SignIn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignUp from "../Components/SignUp/SignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const diamond = {
    initial: {
      rotate: 0,
      transition: {
        duration: 0.5,
      },
    },
    animate: {
      rotate: 360,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <div className="Navbar">
        <div className="LogoContainer"></div>
        <div className="LinksContainer">
          <Link
            activeClass="active"
            to="Hero"
            spy={true}
            hashSpy={true}
            smooth={true}
            offset={-71.5}
            duration={500}
            className="Link">
            Trang chủ
          </Link>
          <Link
            activeClass="active"
            to="AboutPrj"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-71.5}
            duration={500}
            className="Link">
            Về dự án
          </Link>
          <Link
            activeClass="active"
            to="Features"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-71.5}
            duration={500}
            className="Link">
            Tính năng
          </Link>
          <Link
            activeClass="active"
            to="Feedback"
            spy={true}
            smooth={true}
            hashSpy={true}
            offset={-71.5}
            duration={500}
            className="Link">
            Góp ý
          </Link>
        </div>
        {user ? (
          <motion.button
            onClick={() => navigate("main", { replace: true })}
            className=" SignUpNavbtn --btn"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}>
            Sử dụng ứng dụng thui
          </motion.button>
        ) : (
          <div className="BtnsContainer">
            <motion.button
              onClick={() => {
                if (isSignUpOpen) {
                  setIsSignUpOpen(false);
                }
                setIsSignInOpen(true);
              }}
              className=" SignInNavbtn --btn "
              initial="initial"
              animate="initial"
              whileHover="animate">
              <span style={{ marginRight: "0.75rem" }}>Đăng nhập</span>
              <motion.span variants={diamond}>
                <FontAwesomeIcon icon={faDiamond} />
              </motion.span>
            </motion.button>
            <motion.button
              onClick={() => {
                if (isSignInOpen) {
                  setIsSignInOpen(false);
                }
                setIsSignUpOpen(true);
              }}
              className=" SignUpNavbtn --btn"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}>
              Đăng ký
            </motion.button>
          </div>
        )}
        <AnimatePresence initial={false} mode="wait">
          {isSignInOpen && !isSignUpOpen && (
            <SignIn
              onClose={() => {
                setIsSignInOpen(false);
              }}
            />
          )}
          {isSignUpOpen && !isSignInOpen && (
            <SignUp
              onClose={() => {
                setIsSignUpOpen(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
