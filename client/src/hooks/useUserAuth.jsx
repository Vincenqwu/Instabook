import React, { useState, useEffect } from "react";
// import { useAuthToken } from "../AuthTokenContext";


export default function useUserAuth() {
  //const { accessToken } = useAuthToken();
  const [ authInfo, setAuthInfo ] = useState({});
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

 useEffect(() => {
    async function getAuthInfoFromApi() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/verify`, {
          method: "GET",
          credentials: 'include',
        });
        if (response.status === 200 || response.status === 304) {
          const user = await response.json();
          setIsLoggedIn(true);
          setAuthInfo(user);
        }
        else {
          setIsLoggedIn(false);
          setAuthInfo({});
        }
      } catch (err) {
        console.log(err);
      }
    }
    console.log(isLoggedIn, authInfo);
    getAuthInfoFromApi();
  }, []);


  return [ authInfo, isLoggedIn ]
}
