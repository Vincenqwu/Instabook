import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import useUserAuth from '../hooks/useUserAuth'
import Comment from "./Comment"
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../style/post.css"

export default function Post({ postID }) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [comments, setComments] = useState([])

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
      setComments(postData.comments.reverse());
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
    else {
      window.location.href = `${process.env.REACT_APP_API_URL}/login`;
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
          const res = await response.json();
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
        aria-label = "comment input"
          placeholder="How do you like this post?"
          className="postCommentInput"
          value={inputValue}
          maxlength="200"
          onChange={handleUserInput}
        />
        <hr />
        {/* <button className="sharePostButton" onClick={postComment}>+</button> */}
        <AddCircleIcon aria-label = "add post comment" className="sharePostButton" onClick={postComment} />
      </div>
    )
  }

  const deletePost = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post/${postID}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res = await response.json();
      console.log('Deleted', res);
      window.location.reload();
    }
    catch (err) {
      console.error(err);
    }
  }



  useEffect(() => {
    if (isLoggedIn && post) {
      console.log(post.likedBy)
      setIsLiked(post.likedBy?.includes(authInfo.auth0Id));
    }
  }, [post, authInfo]);


  return (
    post && postAuthor &&
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${postAuthor.username}`} aria-label="Profile image">
              <img
                className="postProfileImg"
                src={postAuthor.picture}
                alt=""
              />
            </Link>
            <span aria-label = "Profile username" className="postUsername">
              {postAuthor.username}
            </span>
            {authInfo && authInfo.following && authInfo.following.includes(post.authorId) &&
              <span className="postFollowing">
                (following)
              </span>
            }
            <span className="postDate"> {post.createAt.substring(0, 10)}</span>
          </div>
          {isLoggedIn && postAuthor.username === authInfo.username &&
            <div aria-label = "delete icon" className="postTopRight">
              <DeleteIcon className="deleteIcon" onClick={() => deletePost()} />
            </div>
          }
        </div>
        <div aria-label="post image" className="postCenter">
          <span className="postText">{post.content}</span>
          {
            post.image &&
            <img className="postImg" src={post.image} alt="" />
          }
        </div>
        <div className="postBottom">
          <div aria-label = "Likes button" className="postBottomLeft">
            {isLiked ? <FavoriteIcon className="likeIconLiked" onClick={likeHandler} />
              : <FavoriteBorderIcon className="likeIconNotLiked" onClick={likeHandler} />}

            {/* <img className="likeIcon" src={process.env.PUBLIC_URL + "/images/heart.png"} onClick={likeHandler} alt="" /> */}
            <span className="postLikeCounter">{likes} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comments.length} comments</span>
          </div>
        </div>
        <div className="postComments">
          {isLoggedIn && <AddPostComment />}
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}