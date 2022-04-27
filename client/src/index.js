import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Follows from "./pages/Follows";
import Nearby from "./pages/Nearby";
import { AuthTokenProvider } from "./AuthTokenContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthTokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/followers" element={<Follows forFollower={true} />} />
          <Route path="/following" element={<Follows />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthTokenProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
