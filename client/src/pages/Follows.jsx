import "../style/follows.css"
import "../style/page.css" 
import UserIntro from "../components/UserIntro"
import Leftbar from "../components/Leftbar";
import Banner from "../components/Banner";
import useUserAuth from "../hooks/useUserAuth";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";



export default function Follows({forFollower}) {
    const [ authInfo, isLoggedIn ] = useUserAuth();
    const username = authInfo.username;
    const follows = forFollower ? authInfo.follower : authInfo.following;
    console.log("in Follows useEffect")
    return (
        follows && (<>
        <Banner/>
        <div className="followsContainer">
            <Leftbar/>
            <div className="followsWrapper">
                <h2>All {forFollower ? "Followers" : "Followings"}</h2>
                {(isLoggedIn===true && username) ?
                follows.map((f) => (
                    <UserIntro key={f} followId={f} authInfo={authInfo}/>
                )) : <p>You did not logged in yet, you can log in to check following/followers :)</p>}
            </div>
        </div>
        <Footer />
        </>)
    )
}
