import React from "react";
import "./ContentSide.css";
import { faMicrophone, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faComment as farFaComment } from "@fortawesome/free-regular-svg-icons";
import useFetch from "../../useFetch/useFetch";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Collaboration from "../../../Assests/Main/SocialMedia/collaboration.png";
import VoiceRecorderPortal from "../VoiceRecorderPortal/VoiceRecorderPortal";
import { useVoicePortalContext } from "../../../Context/VoicePortalContext";
import { AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PostContent from "../Components/PostContent/PostContent";

const ContentSide = () => {
  const { data: posts, isPending } = useFetch("http://localhost:8080/posts");
  const { isVoicePortalOpen, setIsVoicePortalOpen } = useVoicePortalContext();
  const navigate = useNavigate();
  return (
    <>
      <div className="ContentSideContainer">
        <img
          src={Collaboration}
          className="ContentSideRoundedPanel"
          style={{
            marginTop: 0,
            padding: 0,
            height: "125px",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        <div className="ContentSideRoundedPanel ContentSidePortal">
          <div className="ContentSidePortalInputContainer">
            <img
              src="https://images.unsplash.com/photo-1692910410341-cf21779ebbe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
              alt=""
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <input
              type="text"
              placeholder="Bạn có câu hỏi gì?"
              onClick={() => navigate("new-post")}
            />
          </div>
          <div className="ContentSidePortalButtonsContainer">
            <button onClick={() => setIsVoicePortalOpen(true)}>
              <FontAwesomeIcon style={{ color: "red" }} icon={faMicrophone} />
              <span style={{ marginLeft: "5px" }}>Ghi âm</span>
            </button>
            <button>
              <FontAwesomeIcon style={{ color: "black" }} icon={faFile} />
              <span style={{ marginLeft: "5px" }}>Tài liệu</span>
            </button>
            <button>
              <FontAwesomeIcon style={{ color: "blue" }} icon={faFloppyDisk} />
              <span style={{ marginLeft: "5px" }}>Flashcards</span>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isVoicePortalOpen && <VoiceRecorderPortal />}
        </AnimatePresence>
        {!isPending &&
          posts.map((post) => (
            <div className="ContentSideRoundedPanel" key={post.id}>
              <div className="PostTopPanel">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    src="https://images.unsplash.com/photo-1692910410341-cf21779ebbe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  <div className="PostTopNamePanel">
                    <h4>Đỗ Trọng Khoa</h4>
                    <p>
                      <FontAwesomeIcon
                        icon={faCircle}
                        color="#27A243"
                        fontSize={"8px"}
                      />
                      <span style={{ marginLeft: "4px", fontSize: "0.875rem" }}>
                        Gần đây
                      </span>
                    </p>
                  </div>
                </div>
                <button className="PostButton">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <div className="PostContentPanel">
                {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
              dolorem obcaecati, eos, beatae impedit sapiente magni voluptatibus
              unde exercitationem quaerat officiis vero porro facere. Dicta
              eaque ducimus est iste sit? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Voluptatum sunt perspiciatis, ea
              tempore nihil perferendis quas consequuntur ex, sint dignissimos
              possimus sapiente suscipit deserunt distinctio at. Veritatis enim
              perspiciatis iusto?
            </p>
            <ul className="List">
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/58CKpnuYOmk?si=24trw5vFhC-9m911"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe> */}
                <PostContent content={post.body} />
              </div>
              <div className="PostBottomPanel">
                <button className="PostButton --postButtonMargin">
                  <FontAwesomeIcon color="red" icon={farFaHeart} />
                </button>
                <button className="PostButton">
                  <FontAwesomeIcon icon={farFaComment} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ContentSide;
