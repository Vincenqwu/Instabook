import Banner from "../components/Banner";
import Leftbar from "../components/Leftbar";
import Feeds from "../components/Feeds";
// import { useAuthToken } from "../AuthTokenContext"
import React from "react";

import "../style/home.css"

export default function Home() {

  return (
    <>
      <Banner/>
      <div className="homeContainer">
        <Leftbar />
        <Feeds
          username={null}></Feeds>
      </div>
    </>
  );
}