import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [currUser, setCurrUser] = useState();
  const value = { currUser, setCurrUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
