import React from "react";
import "./BoxSettings.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import MusicSettings from "./MusicSettings/MusicSettings"
import GoalSettings from "./GoalSettings/GoalSettings"
import PomodoroSettings from "./PomodoroSettings/PomodoroSettings";
const BoxSettings = () => {
  const {tabsData, setTabsData} = useState("");
  return (
    <>
      {" "}
      <div>BoxSettings</div>
      <Tabs >
        <TabList>
          <Tab>Mục tiêu</Tab>
          <Tab>Pomodoro</Tab>
          <Tab>Nhạc</Tab>
          <Tab>Widget có sẵn</Tab>
          <Tab>Widget tùy chỉnh</Tab>
        </TabList>

        <TabPanel>
          <GoalSettings/>
        </TabPanel>
        <TabPanel>
          <PomodoroSettings /> 
        </TabPanel>
        <TabPanel>
          <MusicSettings/>
        </TabPanel>
        <TabPanel>
          <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero officiis quod cumque reiciendis iusto mollitia fugiat, iste adipisci soluta unde aspernatur, explicabo quaerat necessitatibus illum esse dolorum iure illo facere.</h2>
        </TabPanel>
        <TabPanel>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam deserunt iste in ut. Repudiandae, magni ex minima maiores deserunt debitis consequatur numquam quaerat deleniti at amet esse corporis recusandae magnam!</h2>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default BoxSettings;
