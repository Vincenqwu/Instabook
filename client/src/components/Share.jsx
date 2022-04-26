import React from 'react';
import { useState, useRef } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import useUserAuth from '../hooks/useUserAuth';


import "../style/share.css"
export default function Share() {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [authInfo] = useUserAuth();

  const shareHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      content: inputRef.current.value,
    };
    console.log(newPost);
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: "POST",
          credentials: 'include',
          body: data
        })
        console.log(newPost);
      } catch (err) {console.log(err);}
    }
    try {
        await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: "POST",
          credentials: 'include',
        })

        const data = await fetch(`${process.env.REACT_APP_API_URL}/post/create`, {
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPost),
        });
        const res = await data.json();
        console.log('Success', res);
        window.location.reload();
    } catch (err) {
      console.log('Error', err);
    }
  };


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={authInfo.picture} alt="" />
          <input
            placeholder= {"What's in your mind? " + authInfo.username}
            className="shareInput"
            ref = {inputRef}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <button className="cancelImgButton" onClick={() => {
              setFile(null);
              document.querySelector('form').reset();
            }}>X</button>
          </div>
        )}
        <form className="shareBottom" onSubmit={shareHandler}>
           <label htmlFor="file" className="shareOption">
            <ImageIcon htmlColor="tomato" className="shareIcon" />
            <span className="shareOptionText">Add A Image</span>
            <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
              </label>
              <button className="shareButton" type="submit">Share</button>
          </form>
          
        </div>

      </div>
  )
}