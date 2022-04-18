import Banner from "../components/Banner";
import Leftbar from "../components/Leftbar";
import Feeds from "../components/Feeds";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "../style/home.css"

export default function Home() {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();


  return (
    <>
      <Banner />
      <div className="homeContainer">
        <Leftbar />
        <Feeds />
      </div>
    </>
  );
}