import React from "react";
import Banner from "../../../components/Banner";
import FeatureSection from "../Shared/FeatureSection";
import FaqSection from "../Shared/FaqSection";
import AboutUs from "../../../components/AboutUs";
import LeaderboardSection from "../../../components/LeaderboardSection";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <LeaderboardSection></LeaderboardSection>
      <AboutUs></AboutUs>
      <FaqSection></FaqSection>
    </>
  );
};

export default Home;
