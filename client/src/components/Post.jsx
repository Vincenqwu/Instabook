import { Users } from "../dummyData";
import { useState } from "react";
import "../style/post.css"
export default function Post({ post }) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  const [commentInput, setCommentInput] = useState(false)
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  const AddPostComment = () => {
    return (
      <div className="addPostComment">
        <input
            placeholder="How do you like this post?"
            className="postCommentInput"
          />
        <hr />
        <button className="sharePostButton">+</button>
      </div>
    )
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={process.env.PUBLIC_URL+post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={process.env.PUBLIC_URL + "/images/heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
        <div className="postComments">
          <button className="postAddCommentButton" onClick={() => setCommentInput(!commentInput)}>+ Add Comment</button>
          {commentInput ? <AddPostComment/> : "" }
          <div className="postComment">
            <span className="commentUser">Vincent: </span>
            <span className="commentContent">I like it</span>
          </div>
          <div className="postComment">
            <span className="commentUser">Annie: </span>
            <span className="commentContent">This is awesome!</span>
          </div>
        </div>
      </div>
    </div>
  );
}