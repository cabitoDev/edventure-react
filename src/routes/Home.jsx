import React from "react";
import { NavBar } from "../components/Navbar/NavBar";
import { Constants } from "../constants";
import { CustomCard } from "../components/CustomCard/CustomCard";
import { ReactLogo } from "../components/ReactLogo/ReactLogo";

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="margin-md flex-column gap-md">
        <div className="home-title">
        <p className="text-3xl">Attend your events, or just create them yourself.</p>
        <p>
          Edventure is a comprehensive platform designed to simplify event
          management and make the experience of attending events more enriching
          and exciting.
        </p>
        </div>
        
        <div className="cards-grid">
          <CustomCard
            title={Constants.CARD_YOUR_EVENTS_TITLE}
            text={Constants.CARD_YOUR_EVENTS_TEXT}
          ></CustomCard>
          <CustomCard
            title={Constants.CARD_CREATE_EVENTS_TITLE}
            text={Constants.CARD_CREATE_EVENTS_TEXT}
          ></CustomCard>
          <CustomCard
            title={Constants.CARD_INTERACT_TITLE}
            text={Constants.CARD_INTERACT_TEXT}
          ></CustomCard>
          <CustomCard
            title={Constants.CARD_TRACKING_TITLE}
            text={Constants.CARD_TRACKING_TEXT}
          ></CustomCard>
        </div>
        <div className="flex-column center pd-top-bottom">
          <ReactLogo />
          <span>Deployed with React</span>
        </div>
      </div>
    </>
  );
};
