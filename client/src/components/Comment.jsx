import { useEffect, useState } from "react";
// import "../style/post.css"

export default function Comment({ comment }) {
  const [commentAuthor, setCommentAuthor] = useState();
  useEffect(() => {
    const fetchCommentAuther = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/id/${comment.authorId}`, {
        credentials: 'include'
      });
      const res = await response.json();
      setCommentAuthor(res);
    }
    fetchCommentAuther();
  }, [])

  return (
    commentAuthor && 
    <div className="postComment">
      <span className="commentUser">{commentAuthor.username}: </span>
      <span className="commentContent">{comment.content}</span>
    </div>
  )
}