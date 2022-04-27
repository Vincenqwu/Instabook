import "../style/follows.css"
import "../style/page.css" 
import UserIntro from "../components/UserIntro"
import Leftbar from "../components/Leftbar";
import Banner from "../components/Banner";
import useUserAuth from "../hooks/useUserAuth";



export default function Follows({forFollower}) {
    // check if logged in, if logged in, show followers, else, show like "You did not logged in yet, you can log in and check following/followers :)"

    const [ authInfo, isLoggedIn ] = useUserAuth();
    console.log("isLoggedIn: " + isLoggedIn);
    const username = authInfo.auth0Id;
    console.log("username " + username);
    const followers = authInfo.follower;
    const followings = authInfo.following;
    console.log("followings: "+followings);
    const follows = forFollower ? followers : followings;
    // TODO: if no followers/followings yet, give some words
    return (
        <>
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
        </>
    )
}
