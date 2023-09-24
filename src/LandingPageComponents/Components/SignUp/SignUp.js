import React from "react";
import "./SignUp.css";
import "../SVGAnimationIconSignModal.css";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import SignInputField from "../SignInputField/SignInputField";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as BookAndPerson } from "../../../Assests/book-and-person-summer-svgrepo-com.svg";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase/config";
import { usersColRef } from "../../../Firebase/config";
import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import PortalContainer from "../../../Components/PortalContainer/PortalContainer";
const SignUp = ({ onClose }) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRePassword, setRegisterRePassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsModalActive(true);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await setDoc(doc(usersColRef, cred.user.uid), {
        username: registerUsername,
        uid: cred.user.uid,
        email: registerEmail
      });
      toast.success("Đăng ký thành công!");
      onClose();
      navigate("main", { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return createPortal(
    <>
      <PortalContainer
        className="SignUpFormContainer"
        onClose={() => {
          onClose();
        }}>
        <form className="SignUpForm" onSubmit={(e) => handleSignUp(e)}>
          <div className="IconContainer">
            <div className={"Icon"}>
              <BookAndPerson
                width={200}
                className={isModalActive ? "active" : ""}
              />
            </div>
            <div className="IconLine"></div>
          </div>
          <h2>Đăng ký</h2>
          <SignInputField
            icon={faUser}
            required={true}
            onChange={setRegisterUsername}
            placeholder={"Tên đăng nhập..."}
            type={"text"}
            className="SignUpInput"
          />
          <SignInputField
            icon={faEnvelope}
            required={true}
            onChange={setRegisterEmail}
            placeholder={"Email..."}
            type={"email"}
            className="SignUpInput"
          />
          <SignInputField
            icon={faLock}
            required={true}
            onChange={setRegisterPassword}
            placeholder={"Mật khẩu..."}
            type={"password"}
            className="SignUpInput"
          />
          <SignInputField
            icon={faLock}
            required={true}
            onChange={setRegisterRePassword}
            placeholder={"Nhập lại mật khẩu..."}
            type={"password"}
            className="SignUpInput"
          />

          <PasswordChecklist
            rules={["match"]}
            value={registerPassword}
            valueAgain={registerRePassword}
            onChange={(isValid) => {
              setIsPasswordValid(isValid);
            }}
            className="PasswordChecklist"
            messages={{
              match: "Mật khẩu khớp",
            }}
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="SignUpbtn"
            disabled={!isPasswordValid}>
            <span>Đăng ký</span>
          </motion.button>
          <p className="SignUp-or-Container">
            <span>hoặc</span>
          </p>
          <div className="SignUpGoogleIconContainer">
            <FontAwesomeIcon icon={faGoogle} className="SignUp__googleIcon" />
          </div>
        </form>
      </PortalContainer>
    </>,
    document.getElementById("portal")
  );
};

export default SignUp;
