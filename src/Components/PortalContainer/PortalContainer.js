import React from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import "./PortalContainer.css";
const PortalContainer = (props) => {
  const dropForm = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: "-50%",
      y: "-50%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.5,
      },
    },
  };
  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="Overlay"
        onClick={() => {
          props.onClose();
        }}></motion.div>

      <motion.div
        className={props.className}
        variants={dropForm}
        initial="hidden"
        animate="visible"
        exit="exit">
        {props.children}
      </motion.div>
    </>,
    document.getElementById("portal")
  );
};

export default PortalContainer;
