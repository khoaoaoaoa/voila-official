import React from "react";
import { useState, useEffect } from "react";
import VoiceRecorder from "./VoiceRecorder/VoiceRecorder";
import Share from "./Share/Share";
import "./VoiceRecorderPortal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import WalkingDuckLottieAnimation from "../../../Assests/WalkingDuck.json";
import Lottie from "lottie-react";
import PortalContainer from "../../../Components/PortalContainer/PortalContainer";
import { useVoicePortalContext } from "../../../Context/VoicePortalContext";

const VoiceRecorderPortal = () => {
  const { setIsVoicePortalOpen } = useVoicePortalContext();
  const [step, setStep] = useState(1);
  const FormHeader = ["Luyện nói", "Hoàn thành!"];
  const FormSubHeader = [
    "Nói năng lưu loát mới có được thiên hạ",
    "Chia sẻ bản ghi âm hoặc lưu vào kho lưu trữ",
  ];
  const [formData, setFormData] = useState({
    AudioFile: null,
    MediaBlobURL: "",
    Share: "",
  });
  useEffect(() => {
    console.log(formData);
  }, []);
  const PageDisplay = () => {
    switch (step) {
      case 1:
        return <VoiceRecorder formData={formData} setFormData={setFormData} />;

      case 2:
        return <Share formData={formData} setFormData={setFormData} />;

      default:
        return new Error(`Invalid step ${step}`);
    }
  };
  return (
    <>
      <PortalContainer
        onClose={() => setIsVoicePortalOpen(false)}
        className="VoiceRecorderPortalForm">
        <div className="VoiceRecorderPortalFormInner">
          <div className="VoiceRecorderPortalFormProgressBarContainer">
            <div
              className="VoiceRecorderPortalFormProgressBar"
              style={{ width: (step * 100) / FormHeader.length + "%" }}></div>
          </div>

          <div className="VoiceRecorderPortalFormHeaderContainer">
            <button
              disabled={step === 1}
              onClick={() => setStep((currentStep) => currentStep - 1)}
              className="VoiceRecorderPortalFormButton">
              <FontAwesomeIcon icon={faLessThan} />
            </button>
            <div className="VoiceRecorderPortalFormHeader">
              <h1>{FormHeader[step - 1]}</h1>
              <p>{FormSubHeader[step - 1]}</p>
            </div>
            <Lottie
              animationData={WalkingDuckLottieAnimation}
              loop={true}
              className="VoiceRecorderPortalLottieAnimation"
            />
            <button
              disabled={step === FormHeader.length}
              onClick={() => setStep((currentStep) => currentStep + 1)}
              className="VoiceRecorderPortalFormButton">
              <FontAwesomeIcon icon={faGreaterThan} />
            </button>
          </div>

          <div className="VoiceRecorderPortalFormContent">{PageDisplay()}</div>
        </div>
      </PortalContainer>
    </>
  );
};

export default VoiceRecorderPortal;
