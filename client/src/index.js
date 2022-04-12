import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Nearby from "./pages/Nearby";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";

const requestedScopes = [
  "read:post",
  "read:user",
  "edit:post",
  "edit:user",
  "delete:post",
  "delete:user",
  "write:post",
  "write:todoitem",
];

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin + "/home"}
      audience={audience}
      scope={requestedScopes.join(" ")}
    >
      <AuthTokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path = "/followers" element={<Followers />} />
            <Route path = "/following" element={<Following />} />
            <Route path = "/nearby" element={<Nearby />} />
            <Route path="*" element = {<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
