import Banner from "./Banner";
import Leftbar from "./Leftbar";
import Feeds from "./Feeds";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "../style/home.css"

export default function Home() {

  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });


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