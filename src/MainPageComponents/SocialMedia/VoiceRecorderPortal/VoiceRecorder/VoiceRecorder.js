import React from "react";
import "./VoiceRecorder.css";
import Lottie from "lottie-react";
import MicrophoneLottieAnimation from "../../../../Assests/Microphone.json";
import WaveformLottieAnimation from "../../../../Assests/Waveform.json";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import useVoiceRecorder from "./useVoiceRecorder/useVoiceRecorder";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import WaveForm from "./WaveForm/WaveForm";
function VoiceRecorder({ formData, setFormData }) {
  const {
    file,
    startRecording,
    stopRecording,
    pauseRecording,
    status,
    mediaBlobUrl,
    resumeRecording,
    setIsCancelling,
    isCancelling,
  } = useVoiceRecorder();
  console.log(status);
  useEffect(() => {
    if (status === "stopped" && file && !isCancelling) {
      setFormData({
        ...formData,
        AudioFile: file,
        MediaBlobURL: mediaBlobUrl,
      });
      console.log(formData);
    } else if (isCancelling) {
      setFormData({
        ...formData,
        AudioFile: null,
        MediaBlobURL: mediaBlobUrl,
      });
    }
  }, [file]);
  console.log(formData);
  return (
    <>
      <div className="VoiceRecorderContainer">
        {status !== "idle" && status !== "stopping" && status !== "stopped" ? (
          <Lottie animationData={WaveformLottieAnimation} loop={true} />
        ) : status == "stopped" && !isCancelling ? (
          <WaveForm url={mediaBlobUrl} />
        ) : null}

        <div className={"VoiceRecorderButtonsContainer"}>
          {/* pause and resume btn */}
          <AnimatePresence>
            {status === "recording" || status === "paused" ? (
              <motion.button
                className="VoiceRecorderButton --stop-resume-cancel "
                onClick={() => {
                  if (status === "paused") {
                    resumeRecording();
                  } else {
                    pauseRecording();
                  }
                }}
                initial={{ opacity: 0, x: "25%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "25%" }}>
                <FontAwesomeIcon
                  icon={status === "recording" ? faPause : faPlay}
                />
              </motion.button>
            ) : null}
          </AnimatePresence>

          {/* play btn */}
          <button
            className="VoiceRecorderButton --play"
            onClick={() => {
              if (status === "idle" || status === "stopped") {
                startRecording();
                setIsCancelling(false);
              } else {
                stopRecording();
              }
            }}>
            {status === "recording" || status === "paused" ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <Lottie
                animationData={MicrophoneLottieAnimation}
                loop={true}
                className="VoiceRecorderLottieAnimation"
              />
            )}
          </button>

          {/* stop btn */}
          <AnimatePresence>
            {status == "recording" || status === "paused" ? (
              <motion.button
                className="VoiceRecorderButton --stop-resume-cancel "
                onClick={() => {
                  setIsCancelling(true);
                  stopRecording();
                }}
                initial={{ opacity: 0, x: "-25%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-25%" }}>
                <FontAwesomeIcon icon={faXmark} />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default VoiceRecorder;
