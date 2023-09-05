import React from "react";
import Hero from "../Hero/Hero";
import AboutPrj from "../AboutPrj/AboutPrj";
import Features from "../Features/Features";
import Feedback from "../Feedback/Feedback";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
const Homepage = () => {
  return (
    <>
    <Navbar/>
      <Hero />
      <AboutPrj />
      <Features />
      <Feedback />
      <Footer />
    </>
  );
};

export default Homepage;
