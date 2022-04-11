import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useRef } from 'react';

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
    isAuthenticated && ( <div className='addpost'>
      <form onSubmit={handlePostSubmit}>
        <label>Add new post:</label>
        <input
          type='text'
          className='input'
          placeholder={"Share anything " + user.name }
          ref={inputRef}
        />
        <button className="shareButton" type="submit">
          Share
        </button>
      </form>
    </div>
    )
  )
}