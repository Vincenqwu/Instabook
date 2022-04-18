import React, { useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();
  const { setCurrentUser } = useUser();


  useEffect(() => {
    async function verifyUser() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/verify-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const user = await data.json();

      if (user.auth0Id) {
        setCurrentUser(user);
        navigate("/home");
      }
    }

    if (accessToken) {
      verifyUser();
    }
    else {
      setCurrentUser(null);
    }
  }, [accessToken, navigate]);

  return <div className="loading">Loading...</div>;
}
