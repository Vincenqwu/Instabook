import "../style/userIntro.css"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react'
import {Users} from "../dummyData";
import useUserAuth from "../hooks/useUserAuth";


// when user not logged in, leave authInfo blank or null
export default function UserIntro({followId, authInfo}) {
    const loggedIn = authInfo ? true : false;
    let followings = [];
    const [followUser, setFollowUser] = useState();
    if(loggedIn){
        followings = authInfo.following;
        console.log(followings);
    }
    useEffect(() => {
        async function getUserInfo(){
            try{
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/id/${followId}`, {credentials:'include'});
                const res = await response.json();
                setFollowUser(res);
            } catch(err){
                console.error(err);
            }
        }  
        getUserInfo();
    }, [])

    const [followed, setFollowed] = useState(followings.includes(followId));
    const handleClick = async () =>{
        try{
            if(followed){
                await fetch(`${process.env.REACT_APP_API_URL}/user/${followUser.username}/unfollow`, {
                    method: "PUT",
                    credentials: 'include',
                });
            } else{
                await fetch(`${process.env.REACT_APP_API_URL}/user/${followUser.username}/follow`, {
                    method: "PUT",
                    credentials: 'include',
                });
            }
            setFollowed(!followed);
        } catch(err){
            console.error(err)
        }
    }

    return (
        followUser && (
        <div className="UserIntro">
            <div className="UserIntroWrapper">
                <div className="userIntroLeft">
                    <Link to={`/profile/${followUser.username}`} style={{ textDecoration: "none" }}>
                        <img className="userImg" src={followUser?.picture} alt="" />
                    </Link>
                    <Link to={`/profile/${followUser.username}`} style={{ textDecoration: "none" }}>
                        <span className="userName">{followUser.username}</span>
                    </Link>
                </div>
                <div className="userIntroRight">
                    <button className="followButton" onClick={handleClick} style={{display: (loggedIn?undefined:"none")}}>
                    {followed ? "Unfollow" : "Follow"}
                    </button>
                </div>
            </div>
            <hr className="UserIntroHr"/>
        </div>
    )
    )
}

