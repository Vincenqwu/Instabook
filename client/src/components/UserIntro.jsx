import "../style/userIntro.css"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react'
import {Users} from "../dummyData";
import useUserAuth from "../hooks/useUserAuth";



export default function UserIntro({followId, authInfo}) {
    // TODO check if fetch is correct.
    // const user = Users.filter((user)=> user.username === "Safak Kocaoglu");
    // const [ authInfo, isLoggedIn ] = useUserAuth();
    // console.log("authInfo in UserIntro: "+authInfo)
    const username = authInfo.username;
    const followings = authInfo.following;
    const [followUser, setFollowUser] = useState();
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

    console.log("followUser: "+followUser)

    //TODO check if use the followName or auth0Id
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
                    {/* TODO: follower/following's image */}
                    <Link to={`/profile/${followUser.username}`} style={{ textDecoration: "none" }}>
                        <img className="userImg" src={followUser?.picture} alt="" />
                    </Link>
                    <Link to={`/profile/${followUser.username}`} style={{ textDecoration: "none" }}>
                        <span className="userName">{followUser.username}</span>
                    </Link>
                </div>
                <div className="userIntroRight">
                    <button className="followButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    </button>
                </div>
            </div>
            <hr className="UserIntroHr"/>
        </div>
    )
    )
}

