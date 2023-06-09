import React from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Follows from "./pages/Follows";
import Nearby from "./pages/Nearby";
import Search from "./pages/Search";
import Followers from "./pages/Followers";
import Followings from "./pages/Followings";
import { AuthTokenProvider } from "./AuthTokenContext";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthTokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Followings />} />
          <Route path="/search/:username" element={<Search />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthTokenProvider>
  </React.StrictMode>
);
