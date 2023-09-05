import React from "react";
import Atom from "../../../Assests/Hero/Atom.svg";
import Computer from "../../../Assests/Hero/Computer.svg";
import DNA from "../../../Assests/Hero/DNA.svg";

import Literature from "../../../Assests/Hero/Literature.svg";
import Satellite from "../../../Assests/Hero/Satellite.svg";
import "./Decorations.css";
export const Decorations = () => {
  return (
    <>
      <img className="Decorations Decorations-TopRight" src={Atom} alt="" />
      <img className="Decorations Decorations-TopLeft" src={Computer} alt="" />
      
      <img className="Decorations Decorations-MiddleRight" src={Literature} alt="" />
      <img className="Decorations Decorations-MiddleLeft" src={Satellite} alt="" />
    </>
  );
};
