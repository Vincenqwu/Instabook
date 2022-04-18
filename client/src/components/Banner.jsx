import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchIcon from '@mui/icons-material/Search';
import "../style/banner.css";

export default function Banner() {
  const { user } = useAuth0();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });

  return (
    <div className="bannerContainer">
      <div className="bannerLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Instabook</span>
        </Link>
      </div>
      <div className="bannerMiddle">
        <div className="searchbar" >
          {/* <button className="searchButton" >Search</button> */}
          <SearchIcon className="searchIcon" onClick={() => console.log("here")}/>
          <input
            placeholder="Search for a user by username"
            className="searchInput"
          />
          
        </div>
      </div>
      <div className="bannerRight">
        <div className="bannerLoginLogout">

          {!isAuthenticated ? (
            <div className="notLogin">
              <button className="btn-secondary" onClick={signUp}>
                Create Account
              </button>
              <button className="btn-login" onClick={loginWithRedirect}>
                Login
              </button>
            </div>
          ) : (
            <button className="btn-logout" onClick={() => logout()}>
              Log Out
            </button>
          )}
        </div>
        <div className="bannerProfile">
          {isAuthenticated ? (
            <Link to={`/profile/${user.name}`}>
              <img
                src={
                  user.profilePicture
                }
                alt=""
                className="bannerImg"
              />
            </Link>
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/images/noAvatar.png"}
              alt=""
              className="bannerImg"
            />
          )}
        </div>
      </div>
    </div>
  );
}
