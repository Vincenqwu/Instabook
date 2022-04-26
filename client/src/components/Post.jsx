//import { Users } from "../dummyData";
import { useState, useEffect } from "react";
import { Posts, Comments } from "../dummyData"
import { Link } from "react-router-dom"
import useUserAuth from '../hooks/useUserAuth'

import "../style/post.css"

export default function Post({ postID }) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [commentInput, setCommentInput] = useState(false)

  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [authInfo, isLoggedIn] = useUserAuth();
  const [postAuthor, setPostAuthor] = useState();


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
      console.log(inputValue);
      event.preventDefault();
      const newComment = {
        content: inputValue
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      });

      resetInputField();
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
    const fetchPost = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/post/${postID}`, {
        credentials: 'include'
      });
      const postData = await res.json();
      setLikes(postData.likedBy.length);
      setPost(postData);
    }
    fetchPost();
    setPost(Posts[0])


  }, [postID])


  useEffect(() => {
    if (isLoggedIn) {
      console.log(post.likedBy)
      setIsLiked(post.likedBy?.includes(authInfo.auth0Id));
    }
  }, [post]);


  useEffect(() => {
    const fetchPostComment = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/post/${postID}/comment`, {
        credentials: 'include'
      });
      const data = await res.json();
      setComments(data);
    }

    setComments(Comments);
  }, [postID])




  return (
    post &&
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.username}`}>
              <img
                className="postProfileImg"
                src={post.picture}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {post.username}
            </span>
            <span className="postDate">{post.createdAt}</span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.content}</span>
          <img className="postImg" src={process.env.PUBLIC_URL + post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={process.env.PUBLIC_URL + "/images/heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{likes}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
        <div className="postComments">
          {isLoggedIn && <button className="postAddCommentButton" onClick={() => setCommentInput(!commentInput)}>+ Add Comment</button>}
          {commentInput ? <AddPostComment /> : ""}

          {Comments.map((comment) => {
            return (
              <div className="postComment">
                <span className="commentUser">{comment.username}: </span>
                <span className="commentContent">{comment.content}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}