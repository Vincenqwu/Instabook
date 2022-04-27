import React from 'react';
import { useState, useEffect } from 'react'
import Banner from '../components/Banner';
import Leftbar from '../components/Leftbar';
import Feeds from '../components/Feeds';
import { useParams } from "react-router";
import useUserAuth from '../hooks/useUserAuth'

import '../style/profile.css';
import "../style/page.css" 

export default function Profile() {
  const [authInfo, isLoggedIn] = useUserAuth();
  const [currUser, setCurrUser] = useState();
  const username = useParams().username;
  const [viewForm, setViewForm] = useState(false);
  const [followed, setFollowed] = useState(false);

  // Fetch the user's data by username endpoint
  // If current user's profile, set the user as currUser
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${username}`, {
          credentials: 'include'
        });
        const res = await response.json();
        setCurrUser(res);
      } catch (err) {
        console.error(err);
      }
    }
    // Check if profile endpoint is logged in user
    if (isLoggedIn && username == authInfo.username) {
      setCurrUser(authInfo);
    }

    else {
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && currUser) {
      setFollowed(authInfo.following.includes(currUser.auth0Id));
    }
  }, [currUser]);

  // Follow or unfollow a current user by myself
  const handleFollow = async () => {

    try {
      if (followed) {
        await fetch(`${process.env.REACT_APP_API_URL}/user/${currUser.username}/unfollow`, {
          method: 'PUT',
          credentials: 'include',
        });
      }
      else {
        await fetch(`${process.env.REACT_APP_API_URL}/user/${currUser.username}/follow`, {
          method: 'PUT',
          credentials: 'include',
        });

      }
      setFollowed(!followed);
    }
    catch (err) {
      console.error(err)
    }
  };


  // // Edit profile
  const EditForm = () => {
    const handleSubmit = async (event) => {
      event.preventDefault();

      const firstname = event.target.firstname.value;
      const lastname = event.target.lastname.value;
      const gender = event.target.gender.value;
      console.log(firstname, lastname, gender);

      const userInfo = {
        firstName: firstname,
        lastName: lastname,
        gender: gender,
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(userInfo)
        });
        const updatedUser = await response.json();
        setCurrUser(updatedUser);
        console.log('Success', updatedUser);
      }
      catch (err) {
        console.error("Error:", err);
      }
    }

    return (
      <form className="profileEditForm" onSubmit={handleSubmit}>
        <label className = "profileEditLabel">First Name:
          <input type="text" name="firstname" />
        </label>
        <label className = "profileEditLabel">Last Name:
          <input type="text" name="lastname" />
        </label>
        <label className = "profileEditLabel">Gender
          <input type="text" name="gender" />
        </label>
        <button className="profileEditButton2" type="submit"> Submit</button>
        <button className="profileEditButton3" type="button" onClick={() => setViewForm(false)}> Cancel </button>
      </form>
    )
  }

  return (
    currUser &&
    (<>
      <Banner />
      <div className="profile-container">
        <Leftbar />
        <div className="profile-info">
          <h1>Profile</h1>
          <div className="profile-header">
            <img
              className="profileUserImg"
              src={currUser?.picture}
              alt=""
            />

            <h4 className="profileInfoName">{currUser?.username}</h4>

            {isLoggedIn && authInfo.username !== username && (
              <button className="profileFollowButton" onClick={handleFollow}>
                {followed ? "Unfollow" : "Follow"}
              </button>
            )}

          </div>
          <div className="profile-details-wrapper">
            <div className="prifile-details">
              <h4 className="detailsTitle">User information</h4>
              <div className="detailsInfo">
                <div className="detailsInfoItem">
                  <span className="detailsInfoKey">First Name: &nbsp;</span>
                  <span className="detailsInfoValue">{currUser?.firstName}</span>
                </div>
                <div className="detailsInfoItem">
                  <span className="detailsInfoKey">Last Name: &nbsp;</span>
                  <span className="detailsInfoValue">{currUser?.lastName}</span>
                </div>
                <div className="detailsInfoItem">
                  <span className="detailsInfoKey">Gender: &nbsp;</span>
                  <span className="detailsInfoValue">{currUser?.gender}</span>
                </div>
                <div className="detailsInfoItem">
                  <span className="detailsInfoKey">Email: &nbsp;</span>
                  <span className="detailsInfoValue">{currUser?.email}</span>
                </div>
              </div>
              {isLoggedIn && authInfo.username === username && (
                <button className="profileEditButton" onClick={() => setViewForm(true)}>Edit</button>
              )}
              <div className="formWrapper">
                {viewForm ?
                  <EditForm /> : ''}
              </div>
            </div>
          </div>
          <div className="profile-feed">
            <Feeds
              username={username}
            />
          </div>
        </div>
      </div>
    </>)
  );
}