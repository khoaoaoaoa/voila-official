import React from 'react'
import "./CallButton.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CallButton = ({icon,inlineStyle}) => {
  return (
    <>
      <div className='CallButtonContainer' style={{...inlineStyle}}>
        <FontAwesomeIcon icon={icon}/>
      </div>
    </>
  )
}

export default CallButton