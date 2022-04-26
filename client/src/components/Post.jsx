import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import useUserAuth from '../hooks/useUserAuth'
import Comment from "./Comment"

import "../style/post.css"

export default function Post({ postID }) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [commentInput, setCommentInput] = useState(false)

  const [post, setPost] = useState();
  //const [comments, setComments] = useState();
  const [authInfo, isLoggedIn] = useUserAuth();
  const [postAuthor, setPostAuthor] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post/${postID}`, {
        credentials: 'include'
      });
      const postData = await response.json();
      setLikes(postData.likedBy.length);
      setPost(postData);
    }
    fetchPost();

  }, [postID])

  useEffect(() => {
    const fetchPostAuthor = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/id/${post.authorId}`, {
        credentials: 'include'
      });
      const res = await response.json();
      setPostAuthor(res);
    }
    if (post) {
      console.log(post.comments);
      fetchPostAuthor();
    }
  }, [post])


  const likeHandler = async () => {
    if (isLoggedIn) {
      if (isLiked) {
        await fetch(`${process.env.REACT_APP_API_URL}/post/${postID}/unlike`, {
          method: 'PUT',
          credentials: 'include'
        })
        setIsLiked(false);
        setLikes(likes - 1);
      }
      else {
        await fetch(`${process.env.REACT_APP_API_URL}/post/${postID}/like`, {
          method: 'PUT',
          credentials: 'include'
        })
        setIsLiked(true);
        setLikes(likes + 1);
      }
    }
  }

  const AddPostComment = () => {
    const [inputValue, setInputValue] = useState("");

    const postComment = async (event) => {
      if (inputValue) {
        console.log(inputValue);
        event.preventDefault();
        const newComment = {
          content: inputValue
        }
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/post/${postID}/comment`, {
            method: "POST",
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
          });
          const res = await res.json();
          console.log('Success', res);
          resetInputField();
          window.location.reload();
        }
        catch (err) {
          console.error(err);
        }
        
      }
    }


    // Input Field handler
    const handleUserInput = (e) => {
      setInputValue(e.target.value);
    };

    const resetInputField = () => {
      setInputValue("");
    };

    return (
      <div className="addPostComment">
        <input
          placeholder="How do you like this post?"
          className="postCommentInput"
          value={inputValue}
          onChange={handleUserInput}
        />
        <hr />
        <button className="sharePostButton" onClick={postComment}>+</button>
      </div>
    )
  }


  useEffect(() => {
    if (isLoggedIn) {
      console.log(post.likedBy)
      setIsLiked(post.likedBy?.includes(authInfo.auth0Id));
    }
  }, [post]);


  return (
    post && postAuthor &&
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${postAuthor.username}`}>
              <img
                className="postProfileImg"
                src={postAuthor.picture}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {postAuthor.username}
            </span>
            <span className="postDate">{post.createAt}</span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.content}</span>
          {
            post.image &&
            <img className="postImg" src={post.image} alt="" />
          }
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={process.env.PUBLIC_URL + "/images/heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{likes} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comments.length} comments</span>
          </div>
        </div>
        <div className="postComments">
          {isLoggedIn && <button className="postAddCommentButton" onClick={() => setCommentInput(!commentInput)}>+ Add Comment</button>}
          {commentInput ? <AddPostComment /> : ""}
          {post.comments.map((comment) => (
            <Comment comment={comment}/>
          ))}
        </div>
      </div>
    </div>
  );
}