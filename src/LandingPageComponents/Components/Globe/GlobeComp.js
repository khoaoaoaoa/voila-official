import React, { useEffect, useRef } from "react";
import Globe  from "react-globe.gl";
import "./GlobeComp.css";

const GlobeComp = (props) => {
  const N = 20;
  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
  }));

  const globeEl = useRef();

  useEffect(() => {
    globeEl.current.controls().enableZoom = false;
    globeEl.current.controls().autoRotate = true;
  }, []);

  

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundColor={"#ffffff00"}
      width={props.width}
      height={props.width}
      arcsData={arcsData}
      arcColor={'color'}
      arcDashLength={() => Math.random()}
      arcDashGap={() => Math.random()}
      arcDashAnimateTime={() => Math.random() * 4000 + 500}
      arcStroke={1.25}
    />
  );
};

export default GlobeComp;