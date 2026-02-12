import { createContext, useState } from "react";

// 1. Create the Context (The "Data Store")
export const AppContext = createContext();

// 2. Create the Provider (The "Wrapper" that gives access to the data)
export const AppContextProvider = ({ children }) => {
  // Define the state you want to share (e.g., user info)
  const [user, setUser] = useState(null);
  const clearUser = () =>setUser(null);


  // Pack the values into an object
  const contextValue = {
    user,
    setUser,
    clearUser
  };

  // Return the Provider wrapping the children
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};