import React from "react";
import ReactPlayer from "react-player";
import { useParticipant } from "@videosdk.live/react-sdk";
import { useMemo, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./ScreenShareView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
const ScreenShareView = (props) => {
  const screenShareAudioRef = useRef(null);
  const {
    screenShareStream,
    screenShareAudioStream,
    screenShareOn,
    pin,
    unpin,
    pinState,
    isLocal,
    displayName,
  } = useParticipant(props.participantId);

  //screenShareStream
  const screenSharingStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareStream, screenShareOn]);

  //screenShareAudio

  useEffect(() => {
    if (screenShareAudioRef.current) {
      if (screenShareOn && screenShareAudioStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(screenShareAudioStream.track);
        screenShareAudioRef.current.srcObject = mediaStream;
        screenShareAudioRef.current
          .play()
          .catch((error) => toast.error(error.message));
      } else {
        screenShareAudioRef.current.srcObject = null;
      }
    }
  }, [screenShareAudioStream, screenShareOn]);

  const pinFunction = () => {
    if (
      props.pinStatus?.participantId === props.participantId &&
      props.pinStatus?.state?.share
    ) {
      return "ScreenShareView --pinnedFirst";
    } else if (
      pinState.share &&
      props.pinStatus?.participantId !== props.participantId
    ) {
      return "ScreenShareView --pinned";
    } else return "ScreenShareView";
  };
  return (
    <>
      {" "}
      {screenShareOn && (
        <div className={pinFunction()}>
          <audio
            ref={screenShareAudioRef}
            autoPlay
            playsInline
            muted={isLocal}
          />
          <p className="displayName">{isLocal ? "You" : displayName}</p>
          <button
            className="pinButton"
            onClick={() => {
              if (pinState.share === true) {
                unpin("SHARE");
              } else {
                pin("SHARE");
              }
            }}>
            <FontAwesomeIcon icon={faThumbtack} />
          </button>
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
            url={screenSharingStream}
            //
            height={"100%"}
            width={"100%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </div>
      )}
    </>
  );
};

export default ScreenShareView;
