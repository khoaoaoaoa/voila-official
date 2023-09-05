import React from "react";
import "./SignIn.css";
import "../SVGAnimationIconSignModal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import SignInputField from "../SignInputField/SignInputField";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ReactComponent as BookAndPerson } from "../../../Assests/book-and-person-summer-svgrepo-com.svg";
import { auth } from "../../../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PortalContainer from "../../../Components/PortalContainer/PortalContainer";
import "react-toastify/dist/ReactToastify.css";
const SignIn = ({ onClose }) => {
  const [SignInEmail, setSignInEmail] = useState(null);
  const [SignInPassword, setSignInPassword] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, SignInEmail, SignInPassword);
      onClose();
      toast.success("Đăng nhập thành công!");
      navigate("main", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setIsModalActive(true);
  }, []);

  return (
    <>
      <PortalContainer
        className="SignInFormContainer"
        onClose={() => onClose()}>
        <form className="SignInForm" onSubmit={(e) => handleSignIn(e)}>
          <div className="IconContainer">
            <div className="Icon">
              <BookAndPerson
                width={200}
                className={isModalActive ? "active" : ""}
              />
            </div>
            <div className="IconLine"></div>
          </div>

          <h2>Đăng nhập</h2>
          <SignInputField
            icon={faEnvelope}
            required={true}
            onChange={setSignInEmail}
            placeholder={"Email..."}
            type={"email"}
            className="SignInInput"
          />
          <SignInputField
            icon={faLock}
            required={true}
            onChange={setSignInPassword}
            placeholder={"Mật khẩu..."}
            type={"password"}
            className="SignInInput"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={!SignInEmail || !SignInPassword}
            className="SignInbtn">
            <span>Đăng nhập</span>
          </motion.button>
          <p className="SignIn-or-Container">
            <span>hoặc</span>
          </p>
          <div className="SignInGoogleIconContainer">
            <FontAwesomeIcon icon={faGoogle} className="SignUp__googleIcon" />
          </div>
        </form>
      </PortalContainer>
    </>
  );
};

export default SignIn;
