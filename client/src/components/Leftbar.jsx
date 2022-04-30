import "../style/leftbar.css"
import {AccountCircle,People,PeopleOutline,LocationOn} from '@mui/icons-material';
import { Link } from "react-router-dom";
import useUserAuth from "../hooks/useUserAuth";


export default function Leftbar() { 
  const [ authInfo, isLoggedIn ] = useUserAuth();
  const username = authInfo.username;
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
      <ul className="leftbarList">
          <li className="leftbarListItem">
          <Link to={`/profile/${username}`} style={{ textDecoration: "none" }}>
            <AccountCircle className="leftbarIcon"/>
            <span className="leftbarListItemText">Profile</span>
          </Link>
          </li>
          <li className="leftbarListItem">
            <Link to="/followers" style={{ textDecoration: "none" }}>
              <People className="leftbarIcon"/>
              <span className="leftbarListItemText">Followers</span>
            </Link>
          </li>
          <li className="leftbarListItem">
            <Link to="/following" style={{ textDecoration: "none" }}>
              <PeopleOutline className="leftbarIcon"/>
              <span className="leftbarListItemText">Followings</span>
            </Link>
          </li>
          <li className="leftbarListItem">
            <Link to="/nearby" style={{ textDecoration: "none" }}>
              <LocationOn className="leftbarIcon"/>
              <span className="leftbarListItemText">Find Nearby</span>  
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
