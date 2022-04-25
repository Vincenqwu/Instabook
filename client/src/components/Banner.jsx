import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import "../style/banner.css";

export default function Banner({isLoggedIn, authInfo}) {

  return (
    <div className="bannerContainer">
      <div className="bannerLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Instabook</span>
        </Link>
      </div>
      <div className="bannerMiddle">
        <div className="searchbar" >
          <SearchIcon className="searchIcon" onClick={() => console.log("here")} />
          <input
            placeholder="Search for a user by username"
            className="searchInput"
          />

        </div>
      </div>
      <div className="bannerRight">
        <div className="bannerLoginLogout">

          {!isLoggedIn ? (
            <div className="notLogin">
              <a href={process.env.REACT_APP_API_URL + "/login"}>
                <button className="btn-loginout">
                  Login
                </button>
              </a>
            </div>
          ) : (
            <a href={process.env.REACT_APP_API_URL + '/logout'}>
            <button className="btn-loginout">
              Logout
            </button>
          </a>
          )}
        </div>
        <div className="bannerProfile">
          {isLoggedIn ? (
            <Link to={`/profile/${authInfo.username}`}>
              <img
                src={
                  authInfo.picture
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