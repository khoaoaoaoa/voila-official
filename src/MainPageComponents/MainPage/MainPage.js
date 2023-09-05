import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar/Navbar";
import "./MainPage.css";
import { Outlet } from "react-router-dom";
import GoalBar from "../Components/GoalBar/GoalBar";
const MainPage = () => {
  return (
    <>
      <div className="MainPage">
        <Navbar Outlet={<Outlet />} GoalBar={<GoalBar />}></Navbar>
      </div>
    </>
  );
};

export default MainPage;
