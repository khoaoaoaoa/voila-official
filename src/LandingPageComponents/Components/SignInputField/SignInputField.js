import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SignInputField.css";
const SignInputField = ({className, icon, type, onChange, placeholder}) => {
  return (
    <>
      <div className={`SignInputFieldContainer ${className}`}>
       { icon && <FontAwesomeIcon className="fontIcon" icon={icon} /> }
        <input
          type={type ? type : "text"}
          placeholder={placeholder}
          required
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default SignInputField;
