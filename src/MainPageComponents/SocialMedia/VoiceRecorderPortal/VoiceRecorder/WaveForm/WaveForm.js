import React from "react";
import Minimap from "wavesurfer.js/plugins/minimap";
import WaveSurfer from "wavesurfer.js";
import "./WaveForm.css";
import { useState, useEffect, useCallback, useRef } from "react";
const WaveForm = (props) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [wavesurfer, setwavesurfer] = useState();

  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#656666",
      progressColor: "#EC5829",
      url: props.url,
      minPxPerSec: 100,
      hideScrollbar: false,
      autoCenter: false,
      fillParent: true,
      barWidth: 9,
      barRadius: 9,
      barHeight: 3,
      dragToSeek: true,
      plugins: [
        // Register the plugin
        Minimap.create({
          height: 20,
          waveColor: "#ddd",
          progressColor: "#999",
          // the Minimap takes all the same options as the WaveSurfer itself
        }),
      ],
    });
    setwavesurfer(ws);
    const subscriptions = [
      ws.on("play", () => setIsPlaying(true)),
      ws.on("pause", () => setIsPlaying(false)),
      ws.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
      ws.destroy();
    };
  }, [props.url]);

  return (
    <>
      <p>
        {currentTime < 600
          ? "0" + Math.floor(currentTime / 60)
          : Math.floor(currentTime / 60)}
        :
        {Math.floor(currentTime % 60) < 10
          ? "0" + Math.floor(currentTime % 60)
          : Math.floor(currentTime % 60)}
      </p>
      <i>Qua trang tiếp theo để dịch âm thanh thành chữ</i>
      <div ref={containerRef} style={{ minHeight: "120px", maxWidth: "80%", margin: "1rem 0rem" }} />

      <button onClick={onPlayClick} className="WaveFormbtn">
        {isPlaying ? "Pause" : "Play"}
      </button>
    </>
  );
};

export default WaveForm;
