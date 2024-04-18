import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUserType = (userType) => {
    setUserType(userType);
  };

  const changeAuthenticationStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider
      value={{
        userType,
        isAuthenticated,
        updateUserType,
        changeAuthenticationStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
