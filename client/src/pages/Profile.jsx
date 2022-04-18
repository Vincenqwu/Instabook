import React from 'react';
import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty'
import TopBar from '../components/Banner';
import Leftbar from '../components/Leftbar';
import Feeds from '../components/Feeds';
import { useParams } from "react-router";
import '../style/profile.css';

export default function Profile() {
  //const { user, isAuthenticated } = useAuth0();
  const username = useParams().username;
  const [user, setUser] = useState({});
  const [viewForm, setViewForm] = useState(false);

  const [followed, setFollowed] = useState(
    false
  );


  useEffect(() => {
    async function getUserInfo() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}`, {
        method: "GET",
      });
      const res = await data.json();
      setUser(res);
    }

    getUserInfo();
  }, [username]);


  const handleFollow = async () => {
    setFollowed(!followed);
  };


  const EditForm = () => {

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(event.target[4].value)
    }

    return (
      <form className="profileEditForm" onSubmit={handleSubmit}>
        <label>First Name:
          <input type="text" name="firstname" />
        </label>
        <label>Last Name:
          <input type="text" name="lastname" />
        </label>
        <label>Email:
          <input type="email" name="email" />
        </label>
        <label>Description:
          <input type="text" name="description" />
        </label>
        <label>Address Street:
          <input type="text" name="street" />
        </label>
        <label>Address City:
          <input type="text" name="city" />
        </label>
        <label>Address Country:
          <input type="text" name="country" />
        </label>
        <button type="submit"> Submit</button>
        <button type="button" onClick={() => setViewForm(false)}> Cancel </button>
      </form>
    )
  }
  return (
    <>
      <TopBar />
      <div className="profile-container">
        <Leftbar />
        <div className="profile-info">
          <h1>Profile</h1>
          <div className="profile-header">
            <img
              className="profileUserImg"
              src={process.env.PUBLIC_URL + "/images/noAvatar.png"}
              alt=""
            />
            <h4 className="profileInfoName">Vincent Wu</h4>
            <h3 className="profileInfoDesc">Yo, what's up?</h3>
            {user.username !== username && (
              <button className="profileFollowButton" onClick={handleFollow}>
                {followed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="profile-details-wrapper">
            <div className="prifile-details">
              <h4 className="detailsTitle">User information</h4>
              <button className="profileEditButton" onClick={() => setViewForm(true)}>Edit</button>
              <div className="detailsInfo">
                <div className="detailsInfoItem">
                  <span className="detailsInfoKey">Username:</span>
                  <span className="detailsInfoValue">Vincenqwu</span>
                </div>
                <div className="detailsInfoItem">
                  <span className="detailsInfoKey">City:</span>
                  <span className="detailsInfoValue">New York</span>
                </div>
                <div className="detailsInfoItem">
                  <span className="detailsInfoKey">Gender:</span>
                  <span className="detailsInfoValue">Male</span>
                </div>
                <div className="detailsInfoItem">
                  <span className="detailsInfoKey">Email:</span>
                  <span className="detailsInfoValue">v@gmail.com</span>
                </div>
              </div>
              <div className="formWrapper">
                {viewForm ?
                  <EditForm /> : ''}
              </div>
            </div>
          </div>
          {/* <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p> {user.email}</p>
            <JSONPretty data={user} /> */}
          <div className="profile-feed">
            <Feeds username={username} />
          </div>
        </div>
      </div>
    </>
  );
}