import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userType, setUserType] = useLocalStorage("userType", null);

  const updateUserType = (userType) => {
    setUserType(userType);
  };

  return (
    <AuthContext.Provider
      value={{
        userType,
        updateUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
