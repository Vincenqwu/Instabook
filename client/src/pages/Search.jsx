import '../style/follows.css';

import React from 'react';
import { useState, useEffect } from 'react'
import Leftbar from '../components/Leftbar';
import Banner from "../components/Banner";
import UserIntro from "../components/UserIntro"
import { useParams } from "react-router";
import useUserAuth from "../hooks/useUserAuth";


export default function Search() {
  const [ authInfo, isLoggedIn ] = useUserAuth();
  const { username } = useParams();
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    async function searchUsers() {
    //   console.log("searching " + username);
      const users = await fetch(`${process.env.REACT_APP_API_URL}/search/${username}`, {
          method: "GET",
      }).then(data => data.json());
    //   console.log(users);
      setUsers(users);
    }

    if(authInfo) {
      searchUsers();
    }
  }, []);

  return (
      <>
      <Banner/>
      <div className="followsContainer">
          <Leftbar/>
          <div className="followsWrapper">
                {
                    (authInfo.username !== undefined && username)?
                    users.map((u) => (
                        <UserIntro key={u.auth0Id} followId={u.auth0Id} authInfo={authInfo}/>
                    )) : <></>
                }
          </div>
      </div>
      </>
  );
}