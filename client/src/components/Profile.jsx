import React from 'react';
import {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty'
import TopBar from './Banner';
import Leftbar from './Leftbar';
import Feeds from './Feeds';
import { useParams } from "react-router"

export default function Profile() {
  //const { user, isAuthenticated } = useAuth0();
  const username = useParams().username;
  const [user, setUser] = useState({});

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

  return (
    <>
      <TopBar />
      <div className="profile-container">
        <Leftbar />
        <div className="profile-details">
          <div className="profile-info">
            <h1>Profile</h1>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p> {user.email}</p>
            <JSONPretty data={user} />
          </div>
          <div className="profile-posts">
            <Feeds username={username} />
          </div>
        </div>
      </div>
    </>
  );
}