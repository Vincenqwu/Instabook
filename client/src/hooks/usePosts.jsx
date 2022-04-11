import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function usePosts() {
  const [postsItems, setPostsItems] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getPostsFromAPI() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const posts = await data.json();

      setPostsItems(todos);
    }

    if (accessToken) {
      getPostsFromAPI();
    }
  }, [accessToken]);

  return [postsItems, setPostsItems];
}
