import Banner from "../components/Banner";
import Leftbar from "../components/Leftbar";
import Feeds from "../components/Feeds";
import Footer from "../components/Footer";
// import { useAuthToken } from "../AuthTokenContext"
import React from "react";
import "../style/page.css" 
import "../style/home.css"

export default function Home() {

  return (
    <>
      <Banner/>
      <div className="homeContainer">
        <Leftbar />
        <div className="homeFeedInfo">
          <Feeds username={null}/>
        </div>
      </div>
      <Footer />
    </>
  );
}