import "../style/follows.css"
import UserIntro from "../components/UserIntro"
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import {Users} from "../dummyData";
import Leftbar from "../components/Leftbar";
import Banner from "../components/Banner";
import useUserAuth from "../hooks/useUserAuth";


export default function Follows({forFollower}) {
    // check if logged in, if logged in, show followers, else, show like "You did not logged in yet, you can log in and check following/followers :)"

    const [ authInfo, isLoggedIn ] = useUserAuth();
    console.log("isLoggedIn: " + isLoggedIn);
    const username = authInfo.auth0Id;
    console.log("username " + username);
    // const userInfo = fetch(`${process.env.REACT_APP_API_URL}/user/${username}`);
    // console.log("userInfo " + userInfo);
    // const user = Users.filter((user)=> user.username === "Safak Kocaoglu");
    // TODO test if the first line of below works.
    const followers = authInfo.follower;
    const followings = authInfo.following;
    console.log("followings: "+followings);
    // const followers = user[0].followers;
    // const followings = user[0].following;
    const follows = forFollower ? followers : followings;
    // TODO: if no followers/followings yet, give some words
    // TODO: if
    return (
        <>
        <Banner/>
        <div className="followsContainer">
            <Leftbar/>
            <div className="followsWrapper">
                <h2>All {forFollower ? "Followers" : "Followings"}</h2>
                {/* {isLoggedIn ? "123" : "456"} */}
                {(isLoggedIn===true && username) ?
                follows.map((f) => (
                    <UserIntro key={f} followName={f} authInfo={authInfo}/>
                )) : <p>You did not logged in yet, you can log in to check following/followers :)</p>}
            </div>
        </div>
        </>
    )
}
