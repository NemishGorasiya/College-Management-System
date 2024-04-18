import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userType, setUserType] = useState("ggggggg");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ userType, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
