import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import Share from "./Share";
import { useAuth0 } from "@auth0/auth0-react";

export default function Feeds({ username }) {
  const { user, isAuthenticated } = useAuth0();
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = username
  //       ? await axios.get("/posts/profile/" + username)
  //       : await axios.get("posts/timeline/" + user._id);
  //     setPosts(
  //       res.data.sort((p1, p2) => {
  //         return new Date(p2.createdAt) - new Date(p1.createdAt);
  //       })
  //     );
  //   };
  //   fetchPosts();
  // }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <h3>Posts</h3>
      </div>
    </div>
  );
}