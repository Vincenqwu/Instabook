import React from "react";

export default function Leftbar() { 
  return (
    <div className="leftbar">
      <h3>Left bar</h3>
      <div className="leftbarWrapper">
      <ul className="leftbarList">
          <li className="leftbarItem">
            <span className="sidebarListItemText">Profiles</span>
          </li>
          <li className="leftbarItem">
            <span className="leftbarListItemText">Followers</span>
          </li>
          <li className="leftbarItem">
            <span className="leftbarListItemText">Following</span>
          </li>
          <li className="leftbarItem">
            <span className="leftbarListItemText">Find Connections Nearby</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
