
import "./SocialMedia.css"
import { Outlet } from "react-router-dom";
const SocialMedia = () => {
  return (
    <>
     <div className="SocialMediaMainContainer">
       <Outlet/>
     </div>
    </>
  );
};

export default SocialMedia;
