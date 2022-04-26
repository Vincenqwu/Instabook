import { useEffect, useState } from "react";
import Post from "./Post";
import Share from "./Share";
import useUserAuth from '../hooks/useUserAuth'
import "../style/feeds.css"


export default function Feeds({ username }) {
  //const { currUser } = useUser();
  const [posts, setPosts] = useState([]);
  const [ authInfo, isLoggedIn ] = useUserAuth();

  useEffect(() => {
    const fetchPosts = async () => {

      if (username !== null) {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/post/from/${username}`, {
          credentials: 'include'
        });
        const res = await data.json();
        console.log('Success', res);
        setPosts(res.reverse());
      }

      else {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/post/feed`, {
          credentials: 'include'
        });
        const res = await data.json();
        console.log('Success', res);
        setPosts(res.reverse());
      }      
    };
    fetchPosts();
  }, [username]);


  useEffect(() => {
    console.log(posts)
  }, [posts]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {isLoggedIn && <Share/>}
        {posts.map((id) => (
          <Post postID={id} />
        ))}
      </div>
    </div>
  );
}