import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState } from "react";
const VoiceRecorderAPI = () => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [file, setFile] = useState(null);
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    pauseRecording,
    resumeRecording,
  } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: { type: "audio/mp3" },
  });
 
  useEffect(() => {
    if (!mediaBlobUrl || isCancelling) {
      return;
    }
    const GetAudioRecorder = async () => {
      try {
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        const audioFile = new File([blob], "Khoaaudio", { type: "audio/mp3" });
        setFile(audioFile);
      } catch (err) {
        console.log(err);
      }
    };
    GetAudioRecorder();
  }, [mediaBlobUrl]);

  return {
    file,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    pauseRecording,
    status,
    resumeRecording,
    setIsCancelling,
    isCancelling
  };
};

export default VoiceRecorderAPI;
