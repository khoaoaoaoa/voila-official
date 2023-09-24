import React from "react";
import "./FeatureButtons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faScroll,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
const FeatureButtons = () => {
  return (
    <>
      <div className="FeatureButtons">
        <button>
          <FontAwesomeIcon icon={faComments} />
        </button>
        <button>
          <FontAwesomeIcon icon={faScroll} />
        </button>
        <button>
          <FontAwesomeIcon icon={faBookOpenReader} />
        </button>
      </div>
    </>
  );
};

export default FeatureButtons;
