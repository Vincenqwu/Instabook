import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import useUserAuth from '../hooks/useUserAuth'
import { useNavigate } from "react-router-dom";

import "../style/banner.css";

export default function Banner() {

  let navigate = useNavigate();

  console.log("banner");
  const [ authInfo, isLoggedIn ] = useUserAuth();
  return (
    <div className="bannerContainer">
      <div className="bannerLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Instabook</span>
        </Link>
      </div>
      <div className="bannerMiddle">
        <form className="searchbar" onSubmit={() => {
          let name = document.getElementsByClassName("searchInput")[0].value;
            navigate(`/search/${name}`);
          }}>
          <button type="submit" className="searchButton">
            <SearchIcon className="searchIcon" onClick={() => console.log("here")} />
          </button>
          <input type="text" required placeholder="Search for a user by username" className="searchInput" />
        </form>
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