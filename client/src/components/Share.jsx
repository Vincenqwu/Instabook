import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useRef } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import "../style/share.css"
export default function Share() {
  const { isAuthenticated, user } = useAuth0();
  const inputRef = useRef();
  console.log(user);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
    console.log(user.name);

    // Add post request
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={process.env.PUBLIC_URL + "/images/noAvatar.png"} alt="" />
          <input
            placeholder="What's in your mind Vincent?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOption">
            <ImageIcon htmlColor="tomato" className="shareIcon" />
            <span className="shareOptionText">Add A Image</span>
          </div>
          <button className="shareButton">Share</button>
        </div>

      </div>
    </div>
  )
}