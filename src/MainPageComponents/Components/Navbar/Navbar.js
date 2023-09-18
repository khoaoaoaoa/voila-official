import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { sidebarClasses, menuClasses } from "react-pro-sidebar";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";

import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/config";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Navbar = ({ GoalBar, Outlet }) => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log(location.pathname);
  const handleSignOut = async () => {
    try {
      navigate("/", { replace: true });
      await signOut(auth);
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const { user, userDocRef } = useAuthContext();
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    setDisplayName(userDocRef?.data()?.displayName);
  }, [userDocRef]);

  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <Sidebar
          collapsedWidth={"120px"}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              height: "100%",
              padding: " 1rem 2rem",
              backgroundColor: "white !important",
            },
          }}
          collapsed={isCollapsed}
          width="350px">
          <Menu
            menuItemStyles={{
              button: {
                borderRadius: "10px",
                paddingLeft: "0.5rem",
                margin: "0.5rem 0rem",
                fontWeight: "bold",
                color: "#92979B",
              },
            }}>
            <div>
              <MenuItem
                icon={
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1692910410341-cf21779ebbe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                      alt=""
                      style={{
                        width: isCollapsed ? "30px" : "50px",
                        height: isCollapsed ? "30px" : "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                }
                rootStyles={{
                  [`.${menuClasses.button}`]: {
                    height: "100px !important",
                    paddingLeft: !isCollapsed && "1rem !important",
                    color: "#4b4d4e !important",
                  },
                  [`.${menuClasses.icon}`]: {
                    height: "50px",
                    width: "50px",
                  },
                }}>
                <div className="DisplayName">
                  <p>{displayName}</p>
                  <p style={{ fontWeight: "normal" }}>
                    {auth?.currentUser?.email}
                  </p>
                </div>
              </MenuItem>
              <MenuItem
                icon={<FontAwesomeIcon icon={faBook} />}
                component={<Link to="materials" />}
                active={location.pathname === "/main/materials"}>
                {" "}
                Tài liệu
              </MenuItem>
              <MenuItem
                icon={<FontAwesomeIcon icon={faGear} />}
                component={<Link to="feynman-technique" />}
                active={location.pathname === "/main/feynman-technique"}>
                Kỹ thuật Feynman
              </MenuItem>
              <MenuItem
                icon={<FontAwesomeIcon icon={faShareNodes} />}
                component={<Link to="social-media" />}
                active={location.pathname === "/main/social-media"}>
                {" "}
                Cộng đồng học tập Voila!
              </MenuItem>
              <MenuItem
                icon={<FontAwesomeIcon icon={faPeopleGroup} />}
                component={<Link to="group-study" />}
                active={location.pathname === "/main/group-study"}>
                {" "}
                Học nhóm
              </MenuItem>
              <MenuItem
                icon={<FontAwesomeIcon icon={faGraduationCap} />}
                component={<Link to="flashcards-review" />}
                active={location.pathname === "/main/flashcards-review"}>
                {" "}
                Ôn tập bài học
              </MenuItem>
            </div>
            <div
              style={{ height: "100%" }}
              onClick={() => setIsCollapsed(!isCollapsed)}></div>
            <div
              style={{
                borderTop: "1px solid gray",
                paddingTop: "0.75rem",
                marginTop: "0.75rem",
              }}>
              <MenuItem
                icon={
                  isCollapsed ? (
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  ) : null
                }
                suffix={<FontAwesomeIcon icon={faRightFromBracket} />}
                rootStyles={{
                  [`.${menuClasses.button}`]: {
                    color: "#4b4d4e !important",
                  },
                }}
                onClick={() => handleSignOut()}>
                {" "}
                Đăng xuất
              </MenuItem>
            </div>
          </Menu>
        </Sidebar>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <main className="Main">
            <div className="MainPromptOuterBackground">
              <div className="MainPromptInnerBackground">{Outlet}</div>
            </div>
          </main>
          {GoalBar}
        </div>
      </div>
    </>
  );
};

export default Navbar;
