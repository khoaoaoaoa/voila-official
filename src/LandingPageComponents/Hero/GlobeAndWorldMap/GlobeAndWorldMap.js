import React from "react";
import GlobeComp from "../../Components/Globe/GlobeComp";
import { ReactComponent as WorldMap } from "../../../Assests/WorldMap.svg";
import "./GlobeAndWorldMap.css";
import { useState, useEffect } from "react";
const GlobeAndWorldMap = () => {
  const [globeWidth, setGlobeWidth] = useState((window.innerWidth * 27.5) / 10);
  useEffect(() => {
    window.addEventListener("resize", () =>
      setGlobeWidth((window.innerWidth * 27.5) / 100)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setGlobeWidth((window.innerWidth * 27.5) / 100)
      );
  }, []);
  return (
    <>
      <div className="HeroGlobeAndWorldMapContainer">
        <div className="HeroGlobe">
          <GlobeComp
            width={globeWidth > 350 ? 350 : globeWidth}
          />
        </div>
        <div className="HeroGlobeWorldMap">
          <WorldMap width={globeWidth + 275 > 650 ? 650 : globeWidth + 250} />
        </div>
      </div>
    </>
  );
};

export default GlobeAndWorldMap;
