import React from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import { useRef, useMemo, useEffect } from "react";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./ParticipantView.css";
function ParticipantView(props) {
  const micRef = useRef(null);
  const {
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    displayName,
    pin,
    unpin,
    pinState,
  } = useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  //MicStream
  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) => toast.error(error.message));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="ParticipantView GridElement">
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      <div className="indicator">
        {!micOn && (
          <div className="micCamIndicator">
            <FontAwesomeIcon icon={faMicrophoneSlash} />
          </div>
        )}
        {!webcamOn && (
          <div className="micCamIndicator">
            <FontAwesomeIcon icon={faVideoSlash} />
          </div>
        )}
      </div>
      <p className="displayName">{isLocal ? "You" : displayName}</p>
      <button
        className="pinButton"
        onClick={() => {
          if (pinState.cam === true) {
            unpin("CAM");
          } else {
            pin("CAM");
          }
        }}>
        <FontAwesomeIcon icon={faThumbtack} />
      </button>
      {webcamOn && (
        <>
          <ReactPlayer
            //
            className="CameraPlayer"
            playsinline // very very imp prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={"100%"}
            width={"100%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </>
      )}
    </div>
  );
}

export default ParticipantView;
