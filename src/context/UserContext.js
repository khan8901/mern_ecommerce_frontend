import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(null);

  

  // Other context-related functions or state can be defined here

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken,isAuthenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };